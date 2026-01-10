<?php

namespace App\Database\Schema\Grammars;

use Illuminate\Database\Schema\Grammars\MySqlGrammar as BaseMySqlGrammar;

class MySqlGrammar extends BaseMySqlGrammar
{
    protected function supportsGenerationExpression(): bool
    {
        try {
            $conn = $this->connection;
            if (method_exists($conn, 'isMaria') && $conn->isMaria()) {
                return false;
            }

            $version = $conn->getServerVersion();
            $major = (int) strtok($version, '.');

            return $major >= 8;
        } catch (\Throwable $e) {
            return false;
        }
    }

    public function compileColumns($schema, $table)
    {
        $select = 'select column_name as `name`, data_type as `type_name`, column_type as `type`, '
            .'collation_name as `collation`, is_nullable as `nullable`, '
            .'column_default as `default`, column_comment as `comment`, ';

        if ($this->supportsGenerationExpression()) {
            $select .= 'generation_expression as `expression`, ';
        } else {
            $select .= 'null as `expression`, ';
        }

        $select .= 'extra as `extra` '
            .'from information_schema.columns where table_schema = %s and table_name = %s '
            .'order by ordinal_position asc';

        return sprintf(
            $select,
            $schema ? $this->quoteString($schema) : 'schema()',
            $this->quoteString($table)
        );
    }
}

