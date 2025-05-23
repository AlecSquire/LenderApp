<?php

namespace App\Http\Controllers;

use App\Mail\PostmarkTestMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail as FacadesMail;

class mail extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $email = new PostmarkTestMail();
        $email->to('alecsquire@gmail.com');
        FacadesMail::send($email);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
