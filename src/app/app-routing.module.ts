import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'more-apps',
    loadChildren: () => import('./more-apps/more-apps.module').then( m => m.MoreAppsPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'favourite',
    loadChildren: () => import('./favourite/favourite.module').then( m => m.FavouritePageModule)
  },
  {
    path: 'quote-viewer',
    loadChildren: () => import('./quote-viewer/quote-viewer.module').then( m => m.QuoteViewerPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
