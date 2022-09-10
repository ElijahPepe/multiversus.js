import { EventEmitter } from 'node:events';
import SteamUser from 'steam-user';

export class Client extends EventEmitter {
	public constructor(options: ClientOptions);
	private _getAccessToken(): Promise<void>;

	public accessToken?: string | null;
	public accounts: AccountManager;
	public apiKey: string;
	public battlepasses: BattlepassManager;
	public clans: ClanManager;
	public destroy(): void;
	public info(steamTicket: string): Promise<any>;
	public isReady(): this is Client;
	public leaderboards: LeaderboardManager;
	public login(username: string, password: string, token: string | null): Promise<string>;
	public matches: MatchManager;
	public profiles: ProfileManager;
	public ready: boolean;
	public steamTicket?: string | null;
	public userAgent: string;
	public user?: SteamUser | null;
	public quests: QuestManager;
}

export interface ClientOptions {
	accessToken?: string;
}

export abstract class BaseManager {
	protected constructor(client: Client);
	public readonly client: Client;
}

export class ProfileManager extends BaseManager {
	private constructor(client: Client);
	public search(username: string, limit?: number, cursor?: string): Promise<Search>;
	public fetch(id: string): Promise<Profile>;
}

export class MatchManager extends BaseManager {
	private constructor(client: Client);
	public fetch(id: string): Promise<any>;
	public fetchAll(id: string, page: number): Promise<any>;
}

export class AccountManager extends BaseManager {
	private constructor(client: Client);
	public fetch(id: string): Promise<any>;
}

export class LeaderboardManager extends BaseManager {
	private constructor(client: Client);
	public fetch(type: string): Promise<any>;
	public fetchCharacter(type: string, character: string): Promise<any>;
	public fetchProfile(id: string, type: string): Promise<any>;
	public fetchProfileCharacter(id: string, type: string, character: string): Promise<any>;
}

export class BattlepassManager extends BaseManager {
	private constructor(client: Client);
	public fetch(id: string): Promise<any>;
}

export class QuestManager extends BaseManager {
	private constructor(client: Client);
	public fetch(id: string): Promise<any>;
}

export class ClanManager extends BaseManager {
	private constructor(client: Client);
	public fetch(id: string, page?: number, count?: number): Promise<any>;
}

export class CharacterData {
	static Shaggy: CharacterDataType;
	static WonderWoman: CharacterDataType;
	static Batman: CharacterDataType;
	static Superman: CharacterDataType;
	static Taz: CharacterDataType;
	static IronGiant: CharacterDataType;
	static Garnet: CharacterDataType;
	static StevenUniverse: CharacterDataType;
	static Jake: CharacterDataType;
	static Reindog: CharacterDataType;
	static Finn: CharacterDataType;
	static Velma: CharacterDataType;
	static AryaStark: CharacterDataType;
	static BugsBunny: CharacterDataType;
	static HarleyQuinn: CharacterDataType;
	static TomAndJerry: CharacterDataType;
	static LeBronJames: CharacterDataType;
	static RickSanchez: CharacterDataType;
	static Morty: CharacterDataType;
	static Gizmo: CharacterDataType;
}

export interface CharacterDataType {
	id: string;
	displayName: string;
	aliases: string[];
}

export type LeaderboardTypes = '2v2' | '1v1';

export abstract class Base {
  public constructor(client: Client);
  public readonly client: Client;
}

export class Profile extends Base {
  protected constructor(client: Client, data: any);
	
	public '1v1': ModeData;
	public '2v2': ModeData;
	public account_id: string;
	public aggregates: any;
	public calculations: any;
	public created_at: string;
	public cross_match_results: any;
	public data: {
		IsChildAccount: boolean;
		PerkPreferences: PerkPreferences;
		'2v2_prompt_shown': number;
	};
	public ffa: ModeData;
	public files: any[];
	public id: string;
	public last_login: string;
	public matches: ModeStats;
	public notifications: any;
	public points: boolean | null;
	public random_distribution: number;
	public server_data: ServerData;
	public updated_at: string;
	public user_segments: string[];
}

export class Search extends Base {
  protected constructor(client: Client, data: any);

	public cursor: string;
	public start: number;
	public count: number;
	public total: number;
	public results: SearchResult[] | [];
}

export interface SearchResult {
	score: number | null;
	result: any;
}

export interface PerkPreferences {
	Characters: any;
}

export interface ServerData {
	debug_all_unlocked: number;
	Level: number;
	CurrentXP: number;
	loss_streak: number;
	BattlepassID: string;
	stat_trackers: StatTrackers;
	UnclaimedCharacterMasteryRewards: any;
	lifetime_damage: number;
	lifetime_ringouts: number;
	matches_played: number;
	sets_played: number;
	OwnedPerks: any;
	'1v1shuffle': any;
	Characters: any;
	'2v2shuffle': any;
	RecentlyToasted: string[] | [];
}

export interface StatTrackers {
	HighestDamageDealt: number;
	TotalAttacksDodged: number;
	TotalAssists: number;
	TotalRingoutLeader: number;
	TotalRingouts: number;
	TotalWins: number;
	character_wins: any;
	TotalDoubleRingouts: number;
}

export class ModeStats {
	'2v2': ModeData;
	ffa: ModeData;
	'1v1': ModeData;
}

export class ModeData {
	loss: number;
	win_streak: number;
	longest_win_streak: number;
	win: number;
}
