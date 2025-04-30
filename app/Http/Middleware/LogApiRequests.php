<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class LogApiRequests
{
    public function handle(Request $request, Closure $next)
    {
        // Debugging: Check if authentication is working
        Log::info('Auth check:', ['authenticated' => Auth::check()]);
        Log::info('Auth user:', ['user' => Auth::user()]);

        // Log the request details
        Log::info('API Request:', [
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'authenticated' => Auth::check(),
            'user' => Auth::user(),
        ]);

        return $next($request);
    }
}
