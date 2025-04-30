<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'contact_name' => $this->contact_name,
            'item_name' => $this->item_name,
            'return_date' => $this->date,
            'contact_email' => $this->contact_email,
            'item_description' => $this->item_description,
            'isReturned' => (bool) $this->isReturned,

        ];
    }
}
