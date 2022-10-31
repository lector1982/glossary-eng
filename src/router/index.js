import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView';

import AddCategoryView from '@/views/AddCategoryView';
import EditCategoryView from '@/views/EditCategoryView';

import AddWordView from '@/views/AddWordView';
import EditWordView from '@/views/EditWordView';

import CategoryView from '@/views/CategoryView';
import SelectCategoryView from '@/views/SelectCategoryView';
import GameView from '@/views/GameView';

const routes = [
	{
		path: '/',
		component: HomeView
	},
	{
		path: '/select_game/:viewGame',
		component: SelectCategoryView
	},
	{
		path: '/:viewGame/:id',
		component: GameView
	},
	{
		path: '/select_game',
		component: CategoryView
	},
	{
		path: '/category/:id',
		component: SelectCategoryView
	},
	{
		path: '/add_cat',
		component: AddCategoryView
	},
	{
		path: '/edit_cat',
		component: EditCategoryView
	},
	{
		path: '/edit_word/:id',
		component: EditWordView
	},
	{
		path: '/add_word',
		component: AddWordView
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;