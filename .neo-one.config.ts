import {
  LocalKeyStore,
  LocalMemoryStore,
  LocalUserAccountProvider,
  NEOONEProvider,
  NetworkType
} from "@neo-one/client-full";


const createUserAccountProviderFunc = (
    network:string,
    rpcURL:string,
) => async() => {
    const keystore = new LocalKeyStore(new LocalMemoryStore());
    await keystore.addUserAccount({
        network: 'testnet',
        privateKey: 'L1j6QBfKNYwC4CyXfQnGxG2Midw48ghnprQRpcSYHDNqaCDcck7P',
        name:"master"
    });

    return new LocalUserAccountProvider({
        keystore,
        provider: new NEOONEProvider([{
            network,
            rpcURL
        }])
    });
    console.log('i ran');

};

export default {
  contracts: {
    // NEO•ONE will look for smart contracts in this directory.
    path: "smart-contract/neo-one/contracts",
  },
  artifacts: {
    // NEO•ONE will store build and deployment artifacts that should be checked in to vcs in this directory.
    path: "smart-contract/artifacts",
  },
  migration: {
    // NEO•ONE will load the deployment migration from this path.
    path: "smart-contract/neo-one/migration.js",
  },
  codegen: {
    // NEO•ONE will write source artifacts to this directory. This directory should be committed.
    path: "smart-contract/codegen",
    // NEO•ONE will generate code in the language specified here. Can be one of 'javascript' or 'typescript'.
    language: "typescript",
    // NEO•ONE will generate client helpers for the framework specified here. Can be one of 'react', 'angular', 'vue' or 'none'.
    framework: "none",
    // Set this to true if you're using an environment like Expo that doesn't handle browserifying dependencies automatically.
    browserify: false,
    // Set this to true if you're running in codesandbox to workaround certain limitations of codesandbox.
    codesandbox: false,
  },
  network: {
    // NEO•ONE will store network data here. This path should be ignored by your vcs, e.g. by specifiying it in a .gitignore file.
    path: ".neo-one/network",
    // NEO•ONE will start the network on this port.
    port: 9040,
  },
  // NEO•ONE will configure various parts of the CLI that require network accounts using the value provided here, for example, when deploying contracts.
  // Refer to the documentation at https://neo-one.io/docs/configuration for more information.
  networks: {
    testnet: { userAccountProvider: createUserAccountProviderFunc(
                "testnet",
                "https://testnet.neotracker.io/rpc"
            )}
  },
  neotracker: {
    // NEO•ONE will start an instance of NEO tracker using this path for local data. This directory should not be committed.
    path: ".neo-one/neotracker",
    // NEO•ONE will start an instance of NEO tracker using this port.
    port: 9041,
    // Set to true if you'd like NEO•ONE to skip starting a NEO tracker instance when running 'neo-one build'.
    skip: true,
  },
};
