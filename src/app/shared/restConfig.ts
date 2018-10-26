import { baseUrl } from './baseurl';
import { Restangular } from 'ngx-restangular';

export function RestangularConfigFactory(RestangularProvider){
    RestangularProvider.setBaseUrl(baseUrl);
}