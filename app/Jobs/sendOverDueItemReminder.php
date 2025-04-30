<?php

namespace App\Jobs;

use App\Mail\ItemDue;
use App\Models\Item;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class sendOverDueItemReminder implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public ItemDue $ItemDue, public Item $item) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        foreach ($item as $item) {
        }
        new ItemDue();
    }
}
