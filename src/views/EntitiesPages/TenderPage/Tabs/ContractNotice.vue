<template>
  <div>
    <div class="entity-nav">
      <a href="#1">Contracting authority</a>
      <a href="#2">Object</a>
      <a href="#3">Legal, economic, financial and technical information</a>
      <a href="#4">Procedure</a>
      <a href="#5">Complementary information</a>
      <a href="#6">Budget</a>
    </div>
    <div class="info">
      <div class="info__title">Contracting authority</div>
      <div class="info__sub-title">Name and address</div>
      <div class="info-block">
        <el-row>
          <el-col :sm="16">
            <div class="info-block__text">
              Official name
            </div>
            <div class="info-block__value">
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.name) }}
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">
              National registration number
            </div>
            <div class="info-block__value">
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.identifier.scheme) }}:
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.identifier.id) }}
            </div>
          </el-col>
        </el-row>
      </div>
      
      <div class="info-block">
        <el-row>
          <el-col :sm="24">
            <div class="info-block__text">
              Postal address
            </div>
            <div class="info-block__value">
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.address.addressDetails.region.description) }},
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.address.streetAddress) }}
            </div>
          </el-col>
        </el-row>
      </div>
      
      <div class="info-block">
        <el-row>
          <el-col :sm="6">
            <div class="info-block__text">
              Town
            </div>
            <div class="info-block__value">
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.address.addressDetails.locality.description) }}
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              Nuts code
            </div>
            <div class="info-block__value">
              n/a
            </div>
          </el-col>
          <el-col :sm="6">
            <div class="info-block__text">
              Postal Code
            </div>
            <div class="info-block__value">
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.address.postalCode, "n/a") }}
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">
              Country
            </div>
            <div class="info-block__value">
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.address.addressDetails.country.description) }}
            </div>
          </el-col>
        </el-row>
      </div>
      
      <div class="info-block">
        <el-row>
          <el-col :sm="10">
            <div class="info-block__text">
              Contact Persone
            </div>
            <div class="info-block__value">
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.contactPoint.name) }}
            </div>
          </el-col>
          <el-col :sm="6">
            <div class="info-block__text">
              Telephone
            </div>
            <div class="info-block__value">
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.contactPoint.telephone) }}
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">
              E-mail
            </div>
            <div class="info-block__value">
              <a
                  :href="`mailto:${gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === 'buyer')), _ => _.contactPoint.email) }`"
              >
                {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.contactPoint.email) }}
              </a>
            </div>
          </el-col>
        </el-row>
      </div>
      
      <div class="info-block">
        <el-row>
          <el-col :sm="10">
            <div class="info-block__text">
              Main Internet address (URL)
            </div>
            <div class="info-block__value">
              <a href="https://www.fisc.md" target="_blank">www.fisc.md</a>
            </div>
          </el-col>
          <el-col :sm="14">
            <div class="info-block__text">
              Address of the buyer profile (URL)
            </div>
            <div class="info-block__value">
              <a :href="`/plans/${gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === 'planning')), _ => _.identifier)}`" target="_blank">
                www.mtender.gov.md/plans/{{ gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === "planning")), _ => _.identifier) }}
              </a>
            </div>
          </el-col>
        </el-row>
      </div>
      
      <div class="info-block">
        <el-row>
          <el-col :sm="10">
            <div class="info-block__text">
              Type of buyer
            </div>
            <div class="info-block__value">
              {{ getTypeOfBuyer }}
            </div>
          </el-col>
          <el-col :sm="14">
            <div class="info-block__text">
              Main activity
            </div>
            <div class="info-block__value">
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.details.mainGeneralActivity, "n/a") }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataFromObject, formatDate } from "../../../../utils";

export default {
  name: "ContractNotice",
  props: {
    msRecord: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log(this.msRecord);
  },
  computed: {
    getTypeOfBuyer() {
      if (!this.gd(this.gd(this.msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.details.typeOfBuyer)) {
        return "n/a";
      }
      return "abc";
    }
  },
  methods: {
    gd(...args) {
      return getDataFromObject(...args);
    }
  }
};
</script>
