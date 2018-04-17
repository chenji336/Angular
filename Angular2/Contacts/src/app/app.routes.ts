import {Routes} from '@angular/router';

import {CollectionComponent} from './collection';
import {ListComponent} from './list';
import {DetailComponent} from './detail';
import {EditComponent} from './edit';

export const rootRouterConfig: Routes = [
	{
		path: "",
		component: ListComponent
		// 如果没有/xxx刷新成功，有的话刷新失败
		// redirectTo: "list",
		// pathMatch: "full",
	},
	{
		path: "list",
		component: ListComponent
	},
	{
		path: "list/:id",
		component: DetailComponent
	},
	{
		path: "collection",
		component: CollectionComponent
	},
	{
		path: "edit",
		component: EditComponent
	},
	{
		path: "edit/:id",
		component: EditComponent
	}
];
