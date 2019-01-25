import { Bookshelf } from '../../../config/Database';


export class OAuthScope extends Bookshelf.Model<OAuthScope> {

    public static async fetchById(value: number): Promise<OAuthScope> {
        return await OAuthScope.where<OAuthScope>({ id: value }).fetch();
    }

    public get tableName(): string { return 'oauth_scope'; }
    public get hasTimestamps(): boolean { return false; }

    public get Id(): number { return this.get('id'); }
    public set Id(value: number) { this.set('id', value); }

    public get Scope(): string { return this.get('scope'); }
    public set Scope(value: string) { this.set('scope', value); }

    public get IsDefault(): boolean { return this.get('is_default'); }
    public set IsDefault(value: boolean) { this.set('is_default', value); }

}
