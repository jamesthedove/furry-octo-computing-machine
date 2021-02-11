const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

/**
 * A BaseService can be used by clients or servers implementing protobuf definitions
 */
class BaseService{

    #protoPath
    #packageName
    #serviceName
    #target

    /**
     *
     * @param protoPath the path to the protobuf definitions
     * @param packageName the package name of the protobuf service
     * @param serviceName the name of the service
     * @param target the url of the server hosting the service. If its null, that indicates that the service is the server, not the client
     */
    constructor(protoPath, packageName, serviceName, target) {
        this.#protoPath = protoPath
        this.#packageName = packageName
        this.#serviceName = serviceName
        this.#target = target

        this.init();
    }

    init(){
        const packageDefinition = protoLoader.loadSync(
            this.#protoPath,
            {keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
        this.protoDefinition = grpc.loadPackageDefinition(packageDefinition)[this.#packageName];

        if (this.#target){
            this.client = new this.protoDefinition[this.#serviceName](this.#target, grpc.credentials.createInsecure());
        }
    }
}

module.exports = BaseService;
