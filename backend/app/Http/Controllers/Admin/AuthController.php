<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            'remember' => ['boolean']
        ]);

        $remember = $credentials['remember'] ?? false;

        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'message' => 'Oops, those credentials you entered do not match our records. Please try again.',
            ], 422);
        }

        /** @var APP\Models\User $user */
        $user = Auth::user();

        if (!$user->is_admin) {
            return response([
                'message' => 'You don\'t have the required permissions to log in as an admin.',
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response([
            'token' => $token,
            'user' => new UserResource($user)
        ]);
    }

    public function logout()
    {
        /** @var APP\Models\User $user */
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }

    public function getUser(Request $request)
    {
        return new UserResource($request->user());
    }
}
