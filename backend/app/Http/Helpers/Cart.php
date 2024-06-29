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
    }

    public static function getCartItems()
    {
        $request = \request();
        $user = $request->user();
        if ($user) {
            return CartItem::where('user_id', $user->id)->get()->map(fn ($item) => ['product_id' => $item->product_id, 'quantity' => $item->quantity]);
        }
    }

    // public static function getCookieCartItems(): array
    // {
    //     $request = \request();
    //     $cartItems = $request->cookie('cart_items');
    //     if (is_string($cartItems)) {
    //         $cartItems = json_decode($cartItems, true);
    //     } else {
    //         $cartItems = [];
    //     }
    //     return $cartItems;
    // }

    public static function getCountFromItems($cartItems)
    {
        return array_reduce(
            $cartItems,
            fn ($carry, $item) => $carry + $item['quantity'],
            0
        );
    }

    public static function moveCartItemsIntoDb($cartItems)
    {
        $request = \request();
        $user = $request->user();
        $dbCartItems = CartItem::where('user_id', $user->id)->get()->keyBy('product_id');

        $newCartItems = [];

        foreach ($cartItems as $cartItem) {
            if (isset($dbCartItems[$cartItem['product_id']])) {
                continue;
            } else {
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
