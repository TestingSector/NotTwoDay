import {
    Column,
    PrimaryColumn,
    Entity,
} from 'typeorm';

@Entity('test_methods')
export class TestMethod {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    standard!: string;

    @Column()
    supportsModulus!: boolean;

    @Column()
    defaultModulus!: boolean;

    @Column()
    testTemperatureMin!: number;

    @Column()
    testTemperatureMax!: number;

    @Column()
    modulusTemperatureMax!: number;

    @Column()
    calculationType!: string;
}