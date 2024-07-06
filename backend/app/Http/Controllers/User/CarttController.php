<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Helpers\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;

class CarttController extends Controller
{
    public function index(Request $request)
    {
        $cartItems = Cart::getCartItems();
        $ids = Arr::pluck($cartItems, 'product_id');
        $products = Product::query()->whereIn('id', $ids)->get();
        $cartItems = Arr::keyBy($cartItems, 'product_id');
        $total = 0;

        foreach ($products as $product) {
            $total += $product->price * $cartItems[$product->id]['quantity'];
        }

        return response([
            'cartItems' => $cartItems,
            'products' => $products,
            'total' => $total
        ]);
    }

    public function addToCart(Request $request, Product $product)
    {
        $quantity = $request->post('quantity', 1);
        $user = $request->user();
        if ($user) {
            $cartItem = CartItem::firstOrNew(['user_id' => $user->id, 'product_id' => $product->id]);
            $cartItem->quantity += $quantity;
            $cartItem->save();
        }

        return response([
            'count' => Cart::getCartItemsCount()
        ]);
    }

    public function addToGuestCart(Request $request, Product $product)
    {
        $quantity = $request->post('quantity', 1);
        $cartItems = Cart::getCookieCartItems();
        $productFound = false;

        foreach ($cartItems as &$item) {
            if ($item['product_id'] === $product->id) {
                $item['quantity'] += $quantity;
                $productFound = true;
                break;
            }
        }

        if (!$productFound) {
            $cartItems[] = [
                'user_id' => null,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
            ];
        }

        Cookie::queue('cart_items', json_encode($cartItems), 60 * 24 * 30);

        return response(['count' => Cart::getCountFromItems($cartItems)]);
    }


    public function remove(Request $request, Product $product)
    {
        $user = $request->user();
        if ($user) {
            $cartItem = CartItem::query()->where(['user_id' => $user->id, 'product_id' => $product->id]);

            if ($cartItem) {
                $cartItem->delete();
            }

            return response([
                'count' => Cart::getCartItemsCount()
            ]);
        } else {
            $cartItems = Cart::getCookieCartItems();
            foreach ($cartItems as $i => $item) {
                if ($item['product_id'] === $product->id) {
                    array_splice($cartItems, $i, 1);
                    break;
                }
            }
            Cookie::queue('cart_items', json_encode($cartItems), 60 * 24 * 30);

            return response(['count' => Cart::getCountFromItems($cartItems)]);
        }
    }

    public function updateQuantity(Request $request, Product $product)
    {
        $quantity = (int)$request->post('quantity');
        $user = $request->user();

        if ($user) {
            $cartItem = CartItem::where(['user_id' => $user->id, 'product_id' => $product->id]);
            $cartItem->update('quantity', $quantity);
        } else {
            $cartItems = Cart::getCookieCartItems();
            foreach ($cartItems as &$item) {
                $item['quantity'] = $quantity;
                break;
            }
            Cookie::queue('cart_items', json_encode($cartItems), 60 * 24 * 30);
        }
        return response(['count' => Cart::getCountFromItems($cartItems)]);
    }
}
