<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(Request $request, $userId)
    {
        $user = User::with($request->with)->findOrFail($userId);

        return $user;
    }

    public function update(UserRequest $request, User $user)
    {
        $user->update($request->all());

        return response()->noContent();
    }
}
