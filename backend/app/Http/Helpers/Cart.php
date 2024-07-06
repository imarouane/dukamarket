<?php

namespace App\Http\Helpers;

use App\Http\Controllers\Controller;
use App\Models\CartItem;

class Cart extends Controller
{
    public static function getCartItemsCount(): int
    {
        $request = \request();
        $user = $request->user();
        if ($user) {
            return CartItem::where('user_id', $user->id)->sum('quantity');
        }

        $cartItems = self::getCookieCartItems();
        return array_reduce(
            $cartItems,
            fn ($carry, $item) => $carry + $item['quantity'],
            0
        );
    }

    public static function getCartItems()
    {
        $request = \request();
        $user = $request->user();
        if ($user) {
            return CartItem::where('user_id', $user->id)->get()->map(fn ($item) => ['product_id' => $item->product_id, 'quantity' => $item->quantity]);
        }

        return self::getCookieCartItems();
    }

    public static function getCookieCartItems(): array
    {
        return json_decode(request()->cookie('cart_items', '[]'), true);
    }

    public static function getCountFromItems($cartItems)
    {
        return array_reduce(
            $cartItems,
            fn ($carry, $item) => $carry + $item['quantity'],
            0
        );
    }

    public static function moveCartItemsIntoDb()
    {
        $user = request()->user();
        $cartItems = self::getCookieCartItems();
        $dbCartItems = CartItem::where('user_id', $user->id)->get()->keyBy('product_id');

        $newCartItems = [];
        foreach ($cartItems as $cartItem) {
            if (!isset($dbCartItems[$cartItem['product_id']])) {
                $newCartItems[] = [
                    'user_id' => $user->id,
                    'products_id' => $cartItem['product_id'],
                    'quantity' => $cartItem['quantity']
                ];
            }
        }

        if (!empty($newCartItems)) {
            CartItem::insert($newCartItems);
        }
    }
}
