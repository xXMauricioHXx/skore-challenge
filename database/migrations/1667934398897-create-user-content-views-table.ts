import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createUserContentViewsTable1667934398897
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'user_content_views',
        columns: [
          {
            name: 'contentId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'int',
            isPrimary: true,
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

    await queryRunner.createForeignKey(
      'user_content_views',
      new TableForeignKey({
        columnNames: ['contentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contents',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('user_content_views');
  }
}
