<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request('search');
        $perPage = request('per_page', 10);
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');

        $query = Product::query();
        $query->orderBy($sortField, $sortDirection);

        if ($search) {
            $query->where('title', 'LIKE', "%{$search}%")->orWhere('description', 'LIKE', "%{$search}%");
        }

        return ProductListResource::collection($query->paginate($perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'title' => ['required', 'max:500'],
                'image' => ['nullable', 'image'],
                'description' => ['nullable', 'string'],
                'price' => ['required', 'numeric'],
            ]
        );

        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = $request->user()->id;

        /** @var \Illuminate\Http\UploadedFile $image */
        $image = $data['image'] ?? null;

        if ($image) {
            $relativePath = $this->saveImage($image);
            $data['image'] = URL::to(Storage::url($relativePath));
            $data['image_mime'] = $image->getClientMimeType();
            $data['image_size'] = $image->getSize();
        }

        $product = Product::create($data);
        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->validate(
            [
                'title' => ['required', 'max:500'],
                'image' => ['nullable', 'image'],
                'description' => ['nullable', 'string'],
                'price' => ['required', 'numeric'],
            ]
        );

        $data['updated_by'] = $request->user()->id;

        /** @var \Illuminate\Http\UploadedFile $image */
        $image = $data['image'] ?? null;

        if ($image) {
            $relativePath = $this->saveImage($image);
            $data['image'] = URL::to(Storage::url($relativePath));
            $data['image_mime'] = $image->getClientMimeType();
            $data['image_size'] = $image->getSize();

            if ($product->image) {
                Storage::deleteDirectory('/public' . dirname($product->image));
            }
        }

        $product->update($data);
        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->image) {
            $imagePath = 'public/' . dirname($product->image);
            Storage::deleteDirectory($imagePath);
        }

        $product->delete();
        return response()->noContent();
    }


    private function saveImage(UploadedFile $image)
    {
        $path = 'public/images/' . date('YmdHis') . Str::random();

        if (!Storage::exists($path)) {
            Storage::makeDirectory($path, 0750, true);
        }

        if (!Storage::putFileAs($path, $image, $image->getClientOriginalName())) {
            throw new \Exception("Unable to save file {$image->getClientOriginalName()}");
        }

        return $path . '/' . $image->getClientOriginalName();
    }
}
