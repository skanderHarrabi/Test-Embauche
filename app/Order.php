<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'qte', 'totalPrice'
    ];

    public function products(){
        return $this->belongsToMany(Products::class)->withPivot(['qte'])->withTimestamps();
    }
}
