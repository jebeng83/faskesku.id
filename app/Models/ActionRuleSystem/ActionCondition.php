<?php

namespace App\Models\ActionRuleSystem;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActionCondition extends Model
{
    protected $table = 'sys_action_conditions';

    protected $fillable = [
        'action_id',
        'handler_class',
        'parameters',
        'priority',
        'is_active',
        'failure_message',
    ];

    protected $casts = [
        'parameters' => 'array',
        'is_active' => 'boolean',
        'priority' => 'integer',
    ];

    /**
     * Get the action that owns the condition.
     */
    public function action(): BelongsTo
    {
        return $this->belongsTo(Action::class, 'action_id');
    }
}
