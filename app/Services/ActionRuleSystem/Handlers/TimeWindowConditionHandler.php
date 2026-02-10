<?php

namespace App\Services\ActionRuleSystem\Handlers;

use App\Services\ActionRuleSystem\Contracts\ConditionHandlerInterface;
use Carbon\Carbon;

class TimeWindowConditionHandler implements ConditionHandlerInterface
{
    public function check(array $parameters, array $context): bool
    {
        $start = $parameters['start_time'] ?? '00:00';
        $end = $parameters['end_time'] ?? '23:59';
        
        $now = Carbon::now();
        $startTime = Carbon::createFromTimeString($start);
        $endTime = Carbon::createFromTimeString($end);

        return $now->between($startTime, $endTime);
    }

    public function defaultFailureMessage(): string
    {
        return 'Tindakan ini tidak dapat dilakukan pada jam saat ini.';
    }
}
