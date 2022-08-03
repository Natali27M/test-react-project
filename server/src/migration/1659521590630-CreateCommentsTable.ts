import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentsTable1659521590630 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Comments (
                id INT PRIMARY KEY AUTO_INCREMENT,
                userId INT NOT NULL,
                postId INT NOT NULL,
                description VARCHAR(255) NOT NULL,
                FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE,
                FOREIGN KEY (postId) REFERENCES Posts (id) ON DELETE CASCADE,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Comments
        `);
    }
}
