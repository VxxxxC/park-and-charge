export interface CarParkInfo {
	name: string;
	latitude: number;
	longitude: number;
	displayAddress?: string;
	district?: string;
	park_Id?: string;
	paymentMethods?: string[];
	address?: {
		dcDistrict?: string;
		[key: string]: unknown;
	};
	renditionUrls?: {
		carpark_photo?: string;
		[key: string]: unknown;
	};
	[key: string]: unknown;
}
