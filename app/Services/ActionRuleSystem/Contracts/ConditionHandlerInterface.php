<?php

namespace App\Services\ActionRuleSystem\Contracts;

interface ConditionHandlerInterface
{
    /**
     * Validate the condition against the provided context.
     *
     * @param array $parameters Configuration parameters from the database.
     * @param array $context Runtime context data (e.g., user, request data).
     * @return bool True if condition is met, False otherwise.
     */
    public function check(array $parameters, array $context): bool;

    /**
     * Get the default failure message.
     * 
     * @return string
     */
    public function defaultFailureMessage(): string;
}
