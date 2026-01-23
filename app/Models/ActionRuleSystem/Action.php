<?php

namespace App\Models\ActionRuleSystem;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Action extends Model
{
    protected $table = 'sys_actions';

    protected $fillable = [
        'slug',
        'name',
        'description',
        'logic_operator',
    ];

    /**
     * Get the conditions for the action.
     */
    public function conditions(): HasMany
    {
        return $this->hasMany(ActionCondition::class, 'action_id')
            ->orderBy('priority', 'desc');
    }

    /**
     * Scope to find by slug.
     */
    public function scopeSlug($query, string $slug)
    {
        return $query->where('slug', $slug);
    }
}
