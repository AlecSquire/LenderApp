<?php

namespace App\Models;

use App\Models\Scopes\UserScope;
use Illuminate\Database\Eloquent\Model;

abstract class UserOwnedModel extends Model
{
    // protected static function booted(): void
    // {
    //     static::addGlobalScope(new UserScope);
    // }
}
