import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createContentTable1667933947659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'contents',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            length: '120',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
            length: '255',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['video', 'pdf', 'image'],
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
            onUpdate: 'now()',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('contents', true);
  }
}
