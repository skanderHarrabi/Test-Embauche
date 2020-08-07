<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    protected $fillable = [
        'name', 'price'
    ];

    public function orders(){
        return $this->belongsToMany(Order::class)->withPivot(['qte'])->withTimestamps();
    }

    public function Categories() {
        return $this->belongsToMany(Category::class)->withTimestamps();
    }
}
