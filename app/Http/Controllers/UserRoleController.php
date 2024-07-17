<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    public function index(Request $request)
    {
        $role = Role::find($request->role_id);
        return $role;
        // ->value('name')
    }
}
