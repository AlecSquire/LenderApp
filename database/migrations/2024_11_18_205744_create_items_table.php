<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {

            $table->id();
            $table->timestamps();
            $table->string('contact_name');
            $table->string('item_name');
            $table->string('transaction_type');
            $table->date('return_date');
            $table->string('contact_email');
            $table->text('item_description')->nullable();
            $table->foreignId('user_id');
            $table->boolean('isReturned')->default(false);
            // $table->unsignedBigInteger('borrower_id')->nullable();

            // $table->foreign('borrower_id')->references('id')->on('borrowers')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
