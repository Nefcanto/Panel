// todo: redirect user to "403" page if his role is not equivalent to role in .env file
// https://keycloak.discourse.group/t/what-is-the-workflow-of-refreshing-the-token-in-an-api-client-scenario/12634/2
// https://github.com/dasniko/keycloak-reactjs-demo

import AccountProvider from '../AccountProvider'
import Globalization from './Globalization';

let keycloak: any = null;

const Account: AccountProvider = {
    provider: () => {
        return keycloak || {};
    },
    token: () => {
        return Account.provider().token;
    },
    user: () => {
        if (Account.provider().tokenParsed['family_name'] || Account.provider().tokenParsed['given_name']) {
            return Account.provider().tokenParsed['given_name'] + ' ' + Account.provider().tokenParsed['family_name']
        } else {
            return Account.provider().tokenParsed.preferred_username;
        }
    },
    userGuid: () => {
        return Account.provider().subject;
    },
    createLoginUrl: () => {
        if (typeof Account.provider().createLoginUrl === 'function') {
            const loginUrl = `${Account.provider().createLoginUrl()}&kc_locale=${Globalization.getLocale().key}`
            console.log(loginUrl)
            return loginUrl
        }
        return 'NA';
    },
    updateToken: (callback) => {
        return Account
            .provider()
            .updateToken(4)
            .then(refreshed => {
                if (refreshed) {
                    // console.info('Token is refreshed');
                } else {
                    // console.info('Token is still valid')
                }
                if (callback && typeof callback === 'function') {
                    return callback();
                }
            }).catch(() => {
                console.error('Failed to refresh the token, or the session has expired');
                Account.checkLogin();
            });
    },
    createAccountUrl: () => {
        if (typeof Account.provider().createAccountUrl === 'function') {
            return Account.provider().createAccountUrl();
        }
        return 'NA';
    },
    createLogoutUrl: () => {
        return Account.provider().createLogoutUrl();
    },
    logout: () => {
        return Account.provider().logout();
    },
    role: () => {
        if (!Account.provider().tokenParsed) {
            return 'User';
        }
        const role = Account.roles().filter(i => i.charAt(0) === i.charAt(0).toUpperCase());
        if (role.length > 0) {
            return role[0];
        }
        return 'User';
    },
    roles: () => {
        let roles = Account.provider().tokenParsed.roles;
        if (!roles) {
            roles = Account.provider().tokenParsed.realm_access.roles;
        }
        if (!roles) {
            throw 'Client mapper is not configured in KeyCloak'
        }
        return roles
    },
    isSuperAdmin: () => {
        if (!Account.provider().tokenParsed) {
            return false;
        }
        return Account.roles().includes('SuperAdmin');
    },
    checkLogin: (callback) => {
        const conf = {
            url: import.meta.env.VITE_ACCOUNTS_URL,
            realm: import.meta.env.VITE_ACCOUNTS_REALM,
            client: import.meta.env.VITE_ACCOUNTS_CLIENT
        };

        if (conf.url && conf.realm && conf.client) {
            if (!window["Keycloak"]) {
                throw new Error("Keycloak script is not loaded. Make sure internet is connected, and make sure accounts panel is up and running.")
            }
            keycloak = new window["Keycloak"]({
                url: conf.url,
                realm: conf.realm,
                clientId: conf.client,
                redirectUrl: document.location.origin
            });

            keycloak?.init({
                checkLoginIframe: false
            }).then(function (auth) {
                if (auth) {
                    // EventManager.emit(EventManager.accountUpdated);
                    if (callback && typeof callback === "function") {
                        callback();
                    }
                } else {
                    console.error('Not Authenticated');
                    keycloak.login();
                }
            }).catch(error => {
                console.log(error);
            });
        } else {
            throw new Error('Security is not configured.')
        }
    }
}

export default Account;
