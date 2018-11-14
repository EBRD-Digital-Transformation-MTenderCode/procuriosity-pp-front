<template>
  <div class="entity-wp">
    <el-container direction="vertical" v-if="loaded && Object.keys(contract).length">
      <contract-card
          :entity="entity"
      />
  
      <!-- Procuring entity -->
      <div class="info">
        <div class="info__title">{{ $t("contract.procuring_entity") }}</div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("contract.procuring_entity_full_name") }}</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value">{{ procuringEntity.fullName }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("contract.procuring_entity_identifier") }}</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value">{{ procuringEntity.identifier }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("contract.procuring_entity_address") }}</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value">{{ procuringEntity.address }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("contract.procuring_entity_responsible_person") }}</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value">{{ procuringEntity.responsiblePerson }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
  
      <!-- Suppliers -->
      <div class="info">
        <div class="info__title">{{ $t("contract.suppliers") }}</div>
        <div v-for="(supplier, index) of suppliers" :key="supplier.identifier">
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">{{ $t("contract.suppliers_full_name") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value">{{ supplier.fullName }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">{{ $t("contract.suppliers_identifier") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value">{{ supplier.identifier }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">{{ $t("contract.suppliers_address") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value">{{ supplier.address }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">{{ $t("contract.suppliers_responsible_person") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value">{{ supplier.responsiblePerson }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text" v-if="index !== 0">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name" />
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value" />
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
  
      <!-- Procurement info -->
      <div class="info">
        <div class="info__title">{{ $t("contract.procuring_info") }}</div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("contract.procuring_info_value") }} ({{ procurementInfo.currency }})</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value info__value_accent">{{ procurementInfo.amount }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
  
      <!-- Documents -->
      <div class="info" v-if="documents.length">
        <div class="info__title">{{ $t("contract.documents") }}</div>
        <div class="info__text" v-for="(document, key) of documents" :key="document.id + key">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info-document_name">
                <div>
                  <a :href="document.url" :title="document.name">{{ document.name }}</a>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info-document_date-published">{{ $t("contract.documents_published") }} {{ document.datePublished }}</div>
              <div class="info-document_id">{{ $t("contract.documents_id") }}: {{ document.id }}</div>
            </el-col>
          </el-row>
          
          <el-row v-for="(oldDoc, index) of document.oldVersions" :key="oldDoc.id + index" class="info-old-document"
                  :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info-document_name">
                <div>
                  <a :href="oldDoc.url" :title="oldDoc.name">{{ oldDoc.name }}</a>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info-document_date-published">{{ $t("contract.documents_published") }} {{ oldDoc.datePublished }}</div>
              <div class="info-document_id">{{ $t("contract.documents_id") }}: {{ oldDoc.id }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
      
      <!-- Items -->
      <div class="info">
        <div class="info__title">{{ $t("contract.items") }}</div>
        <template v-for="item in items">
          <div class="info__text" :key="item.id">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name" :title="item.description">{{ item.description }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value_accent">{{ item.quantityAndUnit }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text" :key="item.id + 1">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10" />
              <el-col :xs="24" :sm="14">
                <div class="info__value info__value_muted">
                  {{ $t("contract.items_cpv") }}: {{ item.cpv }}
                </div>
                <div class="info__value info__value_muted">
                  {{ $t("contract.items_delivery_address") }}:  {{ item.deliveryAddress}}
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
      </div>
    </el-container>
    <el-container class="error" key="error" v-if="loaded && error.status" >
      <div class="error-message"> {{error.message}} </div>
      <button
          class="refresh-btn"
          @click="getContract"
      >
        {{$t("contract.refresh")}}
      </button>
    </el-container>
    <el-container class="loading" key="loading" v-if="!loaded" >
    </el-container>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { FETCH_CURRENT_CONTRACT_INFO } from "./../../store/types/actions-types";

  import ContractCard from "../../components/ListCards/ContractCard";
  import DocumentsModal from "./DocumentsModal";

  import { MTENDER1, MTENDER2 } from "./../../store/types/cbd-types";

  import { getDataFromObject, formatDate } from "./../../utils";
  
  export default {
    name: "ContractPage",
    components: {
      "contract-card": ContractCard,
      "documents-modal": DocumentsModal
    },
    created: function() {
      const regexMtener2Id = /^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/;
      const id = this.$route.params.id;
      const cdb = !regexMtener2Id.test(id) ? MTENDER1 : MTENDER2;

      this.$store.dispatch(FETCH_CURRENT_CONTRACT_INFO, {
        cdb,
        id
      });
    },
    methods:{
      getContract() {
        const regexMtener2Id = /^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/;
        const id = this.$route.params.id;
        const cdb = !regexMtener2Id.test(id) ? MTENDER1 : MTENDER2;

        this.$store.dispatch(FETCH_CURRENT_CONTRACT_INFO, {
          cdb,
          id
        });
      },
    },
    computed: {
      ...mapState({
        cdb: state => state.entities.contracts.currentContract.cdb,
        contract: state => state.entities.contracts.currentContract.contractData,
        loaded: state => state.entities.contracts.currentContract.loaded,
        error: state => state.entities.contracts.currentContract.error
      }),
      entity() {
        if (this.cdb === MTENDER1) {
          const contract = this.contract;
          
          return {
            procedureStatus: getDataFromObject(contract, _ => _.status),
            modifiedDate: getDataFromObject(contract, _ => _.dateModified),
            title: getDataFromObject(contract, _ => _.title),
            description: getDataFromObject(contract, _ => _.description),
            currency: getDataFromObject(contract, _ => _.value.currency),
            amount: getDataFromObject(contract, _ => _.value.amount),
            buyerName: getDataFromObject(contract, _ => _.procuringEntity.name),
            buyerRegion: getDataFromObject(contract, _ => _.procuringEntity.address.region),
            entityId: getDataFromObject(contract, _ => _.contractID)
          };
        }
        return {}
      },
      procuringEntity() {
        if (this.cdb === MTENDER1) {
          const contract = this.contract;
          
          return {
            fullName: getDataFromObject(contract, _ => _.procuringEntity.name),
            identifier: `${getDataFromObject(contract, _ => _.procuringEntity.identifier.scheme)}
                         ${getDataFromObject(contract, _ => _.procuringEntity.identifier.id)} -
                         ${getDataFromObject(contract, _ => _.procuringEntity.identifier.legalName)}`,
            address: `${getDataFromObject(contract, _ => _.procuringEntity.address.postalCode)},
                      ${getDataFromObject(contract, _ => _.procuringEntity.address.countryName)},
                      ${getDataFromObject(contract, _ => _.procuringEntity.address.region)},
                      ${getDataFromObject(contract, _ => _.procuringEntity.address.locality)},
                      ${getDataFromObject(contract, _ => _.procuringEntity.address.streetAddress)}`,
            responsiblePerson: `${getDataFromObject(contract, _ => _.procuringEntity.contactPoint.name)} /
                                ${getDataFromObject(contract, _ => _.procuringEntity.contactPoint.email)} /
                                ${getDataFromObject(contract, _ => _.procuringEntity.contactPoint.telephone)}`
          };
        }
        return {}
      },
      suppliers() {
        if (this.cdb === MTENDER1) {
          const contract = this.contract;

          return getDataFromObject(contract, _ => _.suppliers, []).map(supplier => {
            return {
              fullName: getDataFromObject(supplier, _ => _.name),
              identifier: `${getDataFromObject(supplier, _ => _.identifier.scheme)}
                         ${getDataFromObject(supplier, _ => _.identifier.id)} -
                         ${getDataFromObject(supplier, _ => _.identifier.legalName)}`,
              address: `${getDataFromObject(supplier, _ => _.address.postalCode)},
                      ${getDataFromObject(supplier, _ => _.address.countryName)},
                      ${getDataFromObject(supplier, _ => _.address.region)},
                      ${getDataFromObject(supplier, _ => _.address.locality)},
                      ${getDataFromObject(supplier, _ => _.address.streetAddress)}`,
              responsiblePerson: `${getDataFromObject(supplier, _ => _.contactPoint.name)} /
                                ${getDataFromObject(supplier, _ => _.contactPoint.email)} /
                                ${getDataFromObject(supplier, _ => _.contactPoint.telephone)}`
            };
          })
        }
        return {}
      },
      procurementInfo() {
        if (this.cdb === MTENDER1) {
          const contract = this.contract;
          

          return {
            currency: getDataFromObject(contract, _ => _.value.currency),
            amount: getDataFromObject(contract, _ => _.value.amount)
          };
        }
        return {}
      },
      items() {
        if (this.cdb === MTENDER1) {
          const contract = this.contract;

          return getDataFromObject(contract, _ => _.items, []).map(item => {
            return {
              id: getDataFromObject(item, _ => _.id),
              description: getDataFromObject(item, _ => _.description),
              quantityAndUnit: `${getDataFromObject(item, _ => _.quantity)}
                                ${getDataFromObject(item, _ => _.unit.name)}`,
              cpv: `${getDataFromObject(item, _ => _.classification.id)}
                    ${getDataFromObject(item, _ => _.classification.description)}`,
              deliveryAddress: `${getDataFromObject(item, _ => _.deliveryAddress.postalCode)},
                                ${getDataFromObject(item, _ => _.deliveryAddress.countryName)},
                                ${getDataFromObject(item, _ => _.deliveryAddress.region)},
                                ${getDataFromObject(item, _ => _.deliveryAddress.locality)},
                                ${getDataFromObject(item, _ => _.deliveryAddress.streetAddress)}`
            };
          });
        }
        return [];
      },
      documents() {
        if (this.cdb === MTENDER1) {
          const contract = this.contract;

          const obj = {};
          
          for(const item of [...getDataFromObject(contract, _ => _.documents, [])].sort((doc1, doc2) => new Date(doc2.dateModified) - new Date(doc1.dateModified))) {
            if (!obj.hasOwnProperty(item.id)) {
              obj[item.id] = {
                name: item.title,
                url: item.url,
                datePublished: formatDate(item.datePublished),
                id: item.id
              };
              obj[item.id].oldVersions = []
            } else {
              obj[item.id].oldVersions.push({
                name: item.title,
                url: item.url,
                datePublished: formatDate(item.datePublished),
                id: item.id
              })
            }
          }
          
          return Object.values(obj);
          
          /*return getDataFromObject(contract, _ => _.documents, []).map(doc => {
            return {
              name: getDataFromObject(doc, _ => _.title),
              url: getDataFromObject(doc, _ => _.url),
              datePublished: formatDate(getDataFromObject(doc, _ => _.datePublished)),
              id: getDataFromObject(doc, _ => _.id)
            };
          });*/
        }
        return [];
      }
    }
  };
</script>
