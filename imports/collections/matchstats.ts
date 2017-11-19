import { MongoObservable } from 'meteor-rxjs';

import { MatchStats } from '../models/matchstats.ts';

export const MatchStats = new MongoObservable.Collection<MatchStats>('MatchStats');