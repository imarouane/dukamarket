<?php

namespace App\Http\Helpers;

use App\Http\Controllers\Controller;
use App\Models\CartItem;

class Cart extends Controller
{
    public static function getCartItemsCount(): int
    {
        $request = \request();
        $user = $request->use();
        if ($user) {
            return CartItem::where('user_id', $user->id)->sum('quantity');
        } else {
            $cartItems = self::getCookieCartItems();
            return array_reduce(
                $cartItems,
                fn ($carry, $item) => $carry + $item['quantity'],
                0
            );
        }
    }

    public static function getCartItems()
    {
        $request = \request();
        $user = $request->use();
        if ($user) {
            return CartItem::where('user_id', $user->id)->get()->map(fn ($item) => ['product_id' => $item->product_id, 'quantity' => $item->quantity]);
        } else {
            return self::getCookieCartItems();
        }
    }

    public static function getCookieCartItems(): array
    {
        $request = \request();

        return json_decode($request->cookie('cart_items', []), true);
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
        $request = \request();
        $user = $request->user();
        $cartItems = self::getCookieCartItems();
        $dbCartItems = CartItem::where('user_id', $user->id)->get()->keyBy('product_id');

        $newCartItems = [];

        foreach ($cartItems as $cartItem) {
            if (isset($dbCartItems[$cartItem['product_id']])) {
                continue;
            } else {
                $newCartItems[] = [
                    'user_id' => $user->id,
                    'products_id' => $cartItem['product_id'],
                    'auentity' => $cartItem['quantity']
                ];
            }
        }

        if (!empty($newCartItems)) {
            CartItem::insert($newCartItems);
        }
    }
}
