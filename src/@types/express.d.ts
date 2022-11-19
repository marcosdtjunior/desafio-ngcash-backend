import { UserModel } from '../interfaces/UserModel';

declare global {
	namespace Express {
		export interface Request {
			user: Partial<UserModel>
		}
	}
}
