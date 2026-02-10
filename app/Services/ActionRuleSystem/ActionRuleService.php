<?php

namespace App\Services\ActionRuleSystem;

use App\Models\ActionRuleSystem\Action;
use App\Models\ActionRuleSystem\ActionCondition;
use App\Services\ActionRuleSystem\Contracts\ConditionHandlerInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ActionRuleService
{
    /**
     * Evaluate if an action can be performed based on its conditions.
     *
     * @param string $actionSlug The unique slug of the action.
     * @param array $context Context data required for evaluation (e.g., ['user' => $user, 'amount' => 100]).
     * @return array Result ['allowed' => bool, 'reasons' => array]
     */
    public function evaluate(string $actionSlug, array $context = []): array
    {
        $action = Action::with(['conditions' => function ($query) {
            $query->where('is_active', true);
        }])->slug($actionSlug)->first();

        if (!$action) {
            Log::warning("ActionRuleService: Action '{$actionSlug}' not found.");
            // Default safe fail, or pass if strict mode is off. Assuming fail for safety.
            return ['allowed' => false, 'reasons' => ["Action '{$actionSlug}' not defined."]];
        }

        $conditions = $action->conditions;
        
        if ($conditions->isEmpty()) {
            // No conditions = allowed by default? Or denied? 
            // Usually allowed if no restrictions exist.
            return ['allowed' => true, 'reasons' => []];
        }

        $results = [];
        $isAndLogic = $action->logic_operator === 'AND';
        $finalDecision = $isAndLogic ? true : false; // Start true for AND (fail on first false), false for OR (pass on first true)

        Log::info("ActionRuleService: Evaluating '{$action->name}' ({$actionSlug}) with logic {$action->logic_operator}", ['context_keys' => array_keys($context)]);

        foreach ($conditions as $condition) {
            try {
                if (!class_exists($condition->handler_class)) {
                    throw new \Exception("Handler class {$condition->handler_class} not found.");
                }

                /** @var ConditionHandlerInterface $handler */
                $handler = app($condition->handler_class);
                
                $passed = $handler->check($condition->parameters ?? [], $context);
                $message = $passed ? 'Passed' : ($condition->failure_message ?? $handler->defaultFailureMessage());

                $results[] = [
                    'condition_id' => $condition->id,
                    'handler' => class_basename($condition->handler_class),
                    'passed' => $passed,
                    'message' => $message
                ];

                Log::debug("Condition {$condition->id} ({$condition->handler_class}): " . ($passed ? 'PASS' : 'FAIL'));

                if ($isAndLogic) {
                    if (!$passed) {
                        $finalDecision = false;
                        break; // Short-circuit for AND
                    }
                } else { // OR Logic
                    if ($passed) {
                        $finalDecision = true;
                        break; // Short-circuit for OR
                    }
                }

            } catch (\Exception $e) {
                Log::error("ActionRuleService Error on Condition {$condition->id}: " . $e->getMessage());
                // Treat exception as failure
                $results[] = [
                    'condition_id' => $condition->id,
                    'handler' => $condition->handler_class,
                    'passed' => false,
                    'message' => 'System Error: ' . $e->getMessage()
                ];
                if ($isAndLogic) {
                    $finalDecision = false;
                    break;
                }
            }
        }

        return [
            'allowed' => $finalDecision,
            'reasons' => collect($results)->where('passed', false)->pluck('message')->toArray()
        ];
    }

    /**
     * Add a condition to an action.
     */
    public function addCondition(string $actionSlug, string $handlerClass, array $parameters = [], int $priority = 0, ?string $failureMessage = null): ActionCondition
    {
        $action = Action::firstOrCreate(
            ['slug' => $actionSlug],
            ['name' => Str::title(str_replace('_', ' ', $actionSlug))]
        );

        return $action->conditions()->create([
            'handler_class' => $handlerClass,
            'parameters' => $parameters,
            'priority' => $priority,
            'failure_message' => $failureMessage,
            'is_active' => true
        ]);
    }

    /**
     * Remove a condition.
     */
    public function removeCondition(int $conditionId): bool
    {
        return ActionCondition::destroy($conditionId) > 0;
    }

    /**
     * Modify a condition.
     */
    public function updateCondition(int $conditionId, array $data): bool
    {
        $condition = ActionCondition::find($conditionId);
        if (!$condition) return false;
        return $condition->update($data);
    }
}
