<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'contact_name' => 'string|max:225',
            'transaction_type' => 'in:lending,borrowing',
            'item_name' => 'string|max:225',
            'return_date' => 'date',
            'contact_email' => 'email',
            'item_description' => 'nullable|string|max:500',
            'isReturned' => 'boolean',
        ];
    }
}
