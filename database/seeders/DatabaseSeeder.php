<?php

namespace Database\Seeders;

use App\Models\Borrower;
use App\Models\Item;
use App\Models\Lender;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create users
        $users = User::factory(10)->create();

        // Create borrowers
        $borrowers = Borrower::factory(50)->create();

        // Create lenders
        $lenders = Lender::factory(50)->create();

        // Populate items table



        $itemsData = [
            ['name' => 'Cordless Drill', 'description' => 'A 20V cordless drill with variable speed and extra battery.'],
            ['name' => 'Camping Tent', 'description' => 'A 4-person waterproof camping tent with easy setup.'],
            ['name' => 'Board Game', 'description' => 'A classic Monopoly board game with all pieces intact.'],
            ['name' => 'Guitar', 'description' => 'An acoustic guitar with a carrying case and extra strings.'],
            ['name' => 'Portable Heater', 'description' => 'A compact electric heater with adjustable temperature settings.'],
            ['name' => 'Lawn Mower', 'description' => 'A gas-powered push lawn mower with a sharp blade.'],
            ['name' => 'Bicycle', 'description' => 'A lightweight mountain bike with 21 gears and a water bottle holder.'],
            ['name' => 'Cookware Set', 'description' => 'A 5-piece non-stick cookware set including pots and pans.'],
            ['name' => 'Projector', 'description' => 'A portable HD projector with HDMI and USB input.'],
            ['name' => 'Power Washer', 'description' => 'A high-pressure washer for cleaning outdoor surfaces.'],
            ['name' => 'Cooler', 'description' => 'A large insulated cooler with a carrying handle and wheels.'],
            ['name' => 'Bookshelf', 'description' => 'A wooden bookshelf with 5 adjustable shelves.'],
            ['name' => 'Toolbox', 'description' => 'A metal toolbox filled with essential hand tools.'],
            ['name' => 'Electric Kettle', 'description' => 'A stainless steel kettle with auto shut-off.'],
            ['name' => 'Jigsaw Puzzle', 'description' => 'A 1000-piece landscape jigsaw puzzle.'],
            ['name' => 'Car Jack', 'description' => 'A hydraulic car jack with a 2-ton capacity.'],
            ['name' => 'Camera', 'description' => 'A digital SLR camera with a zoom lens and memory card.'],
            ['name' => 'Dog Crate', 'description' => 'A medium-sized collapsible dog crate for travel.'],
            ['name' => 'Electric Scooter', 'description' => 'A foldable electric scooter with a rechargeable battery.'],
            ['name' => 'Extension Cord', 'description' => 'A 50-foot heavy-duty extension cord with surge protection.'],
            ['name' => 'Ironing Board', 'description' => 'A full-size ironing board with a padded cover.'],
            ['name' => 'Paint Roller Set', 'description' => 'A set of paint rollers, brushes, and a tray.'],
            ['name' => 'Baby Stroller', 'description' => 'A lightweight foldable stroller with storage space.'],
            ['name' => 'Sleeping Bag', 'description' => 'A thermal sleeping bag rated for cold weather.'],
            ['name' => 'Air Mattress', 'description' => 'A queen-size inflatable air mattress with a pump.'],
            ['name' => 'Dumbbell Set', 'description' => 'An adjustable dumbbell set with weights from 5 to 50 pounds.'],
            ['name' => 'Tripod', 'description' => 'A lightweight camera tripod with adjustable height.'],
            ['name' => 'Fishing Rod', 'description' => 'A carbon fiber fishing rod with a spinning reel.'],
            ['name' => 'Helmet', 'description' => 'A safety helmet suitable for cycling or skateboarding.'],
            ['name' => 'Snow Shovel', 'description' => 'A sturdy snow shovel with an ergonomic handle.'],
            ['name' => 'Vacuum Cleaner', 'description' => 'A bagless vacuum cleaner with strong suction.'],
            ['name' => 'Microscope', 'description' => 'A beginner-friendly microscope with 40x to 1000x magnification.'],
            ['name' => 'Tent Poles', 'description' => 'A set of replacement tent poles for camping.'],
            ['name' => 'Stand Mixer', 'description' => 'A 10-speed stand mixer with a stainless steel bowl.'],
            ['name' => 'Picnic Basket', 'description' => 'A wicker picnic basket with plates and cutlery.'],
            ['name' => 'Suitcase', 'description' => 'A medium-sized rolling suitcase with TSA lock.'],
            ['name' => 'Electric Fan', 'description' => 'A desk fan with adjustable speed settings.'],
            ['name' => 'First Aid Kit', 'description' => 'A complete first aid kit for emergencies.'],
            ['name' => 'Garden Hose', 'description' => 'A 100-foot flexible garden hose with a spray nozzle.'],
            ['name' => 'Paddleboard', 'description' => 'An inflatable paddleboard with a pump and paddle.'],
            ['name' => 'Chess Set', 'description' => 'A wooden chess set with handcrafted pieces.'],
            ['name' => 'Laptop Stand', 'description' => 'An adjustable aluminum laptop stand with cooling fans.'],
            ['name' => 'Bluetooth Speaker', 'description' => 'A portable waterproof Bluetooth speaker.'],
            ['name' => 'Pressure Cooker', 'description' => 'A 6-quart electric pressure cooker with multiple settings.'],
            ['name' => 'Tennis Racket', 'description' => 'A lightweight tennis racket with a grip tape.'],
            ['name' => 'Yoga Mat', 'description' => 'A non-slip yoga mat with extra cushioning.'],
            ['name' => 'Tool Belt', 'description' => 'A leather tool belt with multiple pockets.'],
            ['name' => 'Wine Glass Set', 'description' => 'A set of six crystal wine glasses.'],
            ['name' => 'Coffee Grinder', 'description' => 'An electric burr coffee grinder with adjustable settings.'],
        ];
        foreach ($itemsData as $item) {
            Item::create([
                'name' => $item['name'],
                'description' => $item['description'],
                'user_id' => $users->random()->id, // Assign a random user to each item
                'borrower_id' => $borrowers->random()->id, // Assign a random borrower to each item
                'isReturned' => true, // Default value or any appropriate value
            ]);
        }
    }
}
