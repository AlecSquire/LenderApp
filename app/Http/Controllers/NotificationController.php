<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Mail\ItemDue;
use App\Mail\ItemReturned;
use App\Models\Item;
use Illuminate\Support\Facades\Mail;
use App\Traits\ApiResponses;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    use ApiResponses;

    public function markAsReturned(Request $request) {
       $request->validate([
            'item_id' => 'required|integer', // Changed 'id' to 'item_id' to match your route parameter
        ]);

        $item = Item::findOrFail($request->input('item_id'));

        $item->is_returned = true;
        $item->save();

        $user = Auth::user();

Mail::to($user->email)->send(new ItemReturned($item, $user));

        return $this->ok('Notification sent successfully');

    }

    public function store(Request $request)
    {
        $request->validate([
            'id' => 'integer'
        ]);

        $item = Item::findOrFail($request->input('id'));

        Mail::to($item->contact_email)->send(new ItemDue($item));

        return $this->ok('Notification sent successfully');

    }
}
