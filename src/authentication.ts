import { Params, ServiceAddons } from '@feathersjs/feathers';
import { AuthenticationRequest, AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth, OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth';

import { Application } from './declarations';

import axios from 'axios';

declare module './declarations' {
  interface ServiceTypes {
    'authentication': AuthenticationService & ServiceAddons<any>;
  }
}

class FacebookStrategy extends OAuthStrategy {
  async getProfile(authResult: AuthenticationRequest, _param: Params) {
    const accessToken = authResult.access_token;
    const { data } = await axios.get('https://graph.facebook.com/me', {
      headers: {
        authorication: `Bearer ${accessToken}`,
      },
      params: {
        field: 'id,name,email,picture'
      }
    });
    return data;
  }

  async getEntityData(profile: OAuthProfile, existing: any, param: Params) {
    const baseData = await super.getEntityData(profile, existing, param);
    return {
      ...baseData,
      email: profile.email,
      profilePicture: profile.picture,
      firstname: profile['first_name'],
      lastname: profile['last_name'],
    };
  }
}

class GoogleStrategy extends OAuthStrategy {
  async getEntityData(profile: OAuthProfile,  existing: any, param: Params) {
    const baseData = await super.getEntityData(profile, existing, param);
    return {
      ...baseData,
      profilePicture: profile.picture,
      email: profile.email,
      firstname: profile['given_name'],
      lastname: profile['family_name'],
    };
  }
  
  // async getProfile(authResult) {
  // const accessToken = authResult.accessToken;
  // const { data } = await axios.get(`https://openidconnect.googleapis.com/v1/userinfo?access_token=${accessToken}`);
  // return data;
  // }
} 

export default function(app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('google', new GoogleStrategy());
  authentication.register('facebook', new FacebookStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
}
