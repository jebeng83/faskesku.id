<?php

namespace App\Services\ActionRuleSystem\Handlers;

use App\Services\ActionRuleSystem\Contracts\ConditionHandlerInterface;

class RoleConditionHandler implements ConditionHandlerInterface
{
    public function check(array $parameters, array $context): bool
    {
        // Expect 'user' in context
        if (!isset($context['user']) || !method_exists($context['user'], 'hasRole')) {
            // If user not provided or doesn't have hasRole method, fail safely
            // Or return false if role check is mandatory
            return false;
        }

        $requiredRoles = $parameters['roles'] ?? [];
        if (empty($requiredRoles)) {
            return true; // No roles specified means anyone can access? Or fail? Let's say true for flexible config.
        }

        return $context['user']->hasRole($requiredRoles);
    }

    public function defaultFailureMessage(): string
    {
        return 'Anda tidak memiliki hak akses (role) yang sesuai untuk tindakan ini.';
    }
}
