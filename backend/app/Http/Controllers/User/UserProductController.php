<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserProductListResource;
use App\Models\Product;
use Illuminate\Http\Request;

class UserProductController extends Controller
{
    public function index()
    {
        $search = request('search');
        $perPage = request('per_page', 12);
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');

        $query = Product::query();
        $query->orderBy($sortField, $sortDirection);

        if ($search) {
            $query->where('title', 'LIKE', "%{$search}%")->orWhere('description', 'LIKE', "%{$search}%");
        }

        return UserProductListResource::collection($query->paginate($perPage));
    }
}
