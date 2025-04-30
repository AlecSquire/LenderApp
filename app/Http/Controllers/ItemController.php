<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use App\Traits\ApiResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;


// use Illuminate\Pagination\Paginator;

class ItemController extends Controller
{
    use ApiResponses;

    /**
     * Display a listing of the resource.
     */
    // List all items
    public function index(): JsonResponse
    {
        return $this->ok('Items fetched successfully', Auth::user()->items);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ItemRequest $request): ItemResource
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        $item = Item::create($data);
        return new ItemResource($item);
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $id): ItemResource
    {
        return new ItemResource($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ItemRequest $request, Item $id): ItemResource
    {
        $id->update($request->validated());

        return new ItemResource($id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $id): JsonResponse
    {
        $id->delete();
        return $this->ok('Item deleted successfully');
    }
}
