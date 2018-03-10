import { merge } from 'lodash';
import rootResolvers from './rootResolvers';
import typeResolvers from './typeResolvers';


const resolvers = merge(rootResolvers, typeResolvers);
export default resolvers;

