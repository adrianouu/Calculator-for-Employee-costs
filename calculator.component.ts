import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { calculateRoi } from 'src/main';
import { FormControl } from '@angular/forms';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  anzahlArbeiter: number | undefined = 100;
  gehaltProMa: number | undefined;
  gewinnProMa: number | undefined;
  krankheitstageProMA: number | undefined;
  abgaengeLetztesJahr: number | undefined;
  arbeitstageProMonat: number | undefined;
  ankuendigungKuendigungMonate: number | undefined;
  wiederbesetzungMonate: number | undefined;
  einarbeitungszeitMonate: number | undefined;
  kostenRekrutierungMA: number | undefined;
  dailyCost: number | undefined;
  dailyLoss: number | undefined;
  totalCost: number | undefined;
  totalEmployeeCost: number | undefined;
  preEfficiencyLoss: number | undefined;
  postEfficiencyLoss: number | undefined;
  missingEmployeeLoss: number | undefined;
  efficiencyLossIncorporation: number | undefined;
  totalRecruitmentCost: number | undefined;
  negativeKostenRekrutierungMA: number | undefined;
  completeCostReplacement: number | undefined;
  reduceSickDaysPercentage: number | undefined;
  percentageIllness: number | undefined;
  reduceEmployeeReplacementPercentage: number | undefined;
  percentageReplacement: number | undefined;
  savingIllnessAndEmployeeReplacementAmount: number | undefined;
  potentialRoi: number | undefined;
  kibunLizenzProJahr: number = 4950;
  defaultAnzahlArbeiter: number = 100;
  defaultGehaltProMa: number = 49200;
  defaultGewinnProMa: number = 8000;
  defaultKrankheitstageProMA: number = 10.9;
  defaultAbgaengeLetztesJahr: number = 30; //TODO check again , relative to the Anzahl Arbeiter, not constant value
  defaultArbeitstageProMonat: number = 20;
  defaultAnkuendigungKuendigungMonate: number = 2;
  defaultWiederbesetzungMonate: number = 4;
  defaultEinarbeitungszeitMonate: number = 6;
  defaultNegativeKostenRekrutierungMA: number = 1000;
  defaultPercentageIllness: number = 10;
  defaultPercentageReplacement: number = 10;
  options: Options = {
    floor: 0,
    ceil: 1000,
    showTicks: false,
    showTicksValues: false,
  };
  value: number = 10;

  ngOnInit(): void {
    this.showDefaultValuesAfterRefresh();
    this.callAllMethods();
  }

  showDefaultValuesAfterRefresh(): void {
    this.anzahlArbeiter = this.defaultAnzahlArbeiter;
    this.gehaltProMa = this.defaultGehaltProMa;
    this.gewinnProMa = this.defaultGewinnProMa;
    this.krankheitstageProMA = this.defaultKrankheitstageProMA;
    this.abgaengeLetztesJahr = this.defaultAbgaengeLetztesJahr;
    this.arbeitstageProMonat = this.defaultArbeitstageProMonat;
    this.ankuendigungKuendigungMonate =
      this.defaultAnkuendigungKuendigungMonate;
    this.wiederbesetzungMonate = this.defaultWiederbesetzungMonate;
    this.einarbeitungszeitMonate = this.defaultEinarbeitungszeitMonate;
    this.kostenRekrutierungMA = this.defaultNegativeKostenRekrutierungMA;
  }

  dailyCostPerEmployee(): void {
    this.dailyCost =
      -(this.gehaltProMa ?? this.defaultGehaltProMa) /
      12 /
      (this.arbeitstageProMonat ?? this.defaultArbeitstageProMonat);
    this.dailyCost = Number(this.dailyCost.toFixed(2));
    console.log(this.dailyCost, 'hello');
  }

  dailyProfitLossPerEmployee(): void {
    this.dailyLoss =
      -(this.gewinnProMa ?? this.defaultGewinnProMa) /
      12 /
      (this.arbeitstageProMonat ?? this.defaultArbeitstageProMonat);
    this.dailyLoss = Number(this.dailyLoss.toFixed(2));
    console.log(this.dailyLoss, 'bye');
  }

  totalYearlyCostPerEmployee(): void {
    if (this.dailyCost !== undefined && this.dailyLoss !== undefined) {
      this.totalCost =
        (this.dailyCost + this.dailyLoss) *
        (this.krankheitstageProMA ?? this.defaultKrankheitstageProMA);
      this.totalCost = Number(this.totalCost.toFixed(2));
      console.log(this.totalCost, 'HIHU');
    } else {
      this.totalCost = undefined;
    }
  }

  totalYearlyCostAllEmployees(): void {
    if (this.totalCost !== undefined && this.anzahlArbeiter !== undefined) {
      this.totalEmployeeCost = this.totalCost * this.anzahlArbeiter;
      this.totalEmployeeCost = Number(this.totalEmployeeCost.toFixed(2));
      console.log(this.totalEmployeeCost, 'Dettaglio');
    } else {
      this.totalEmployeeCost = undefined;
    }
  }

  efficiencyLossBeforeResignationNotice(): void {
    this.preEfficiencyLoss = -(
      (((this.gewinnProMa ?? this.defaultGewinnProMa) +
        (this.gehaltProMa ?? this.defaultGehaltProMa)) /
        12) *
      (1.5 / 100) *
      40
    );
    this.preEfficiencyLoss = Number(this.preEfficiencyLoss.toFixed(2));
    console.log(this.preEfficiencyLoss, 'BLABLA');
  }

  efficiencyLossAfterResignationNotice(): void {
    this.postEfficiencyLoss =
      -(
        ((((this.gewinnProMa ?? this.defaultGewinnProMa) +
          (this.gehaltProMa ?? this.defaultGehaltProMa)) /
          12) *
          (this.ankuendigungKuendigungMonate ??
            this.defaultAnkuendigungKuendigungMonate)) /
        100
      ) * 70;
    this.postEfficiencyLoss = Number(this.postEfficiencyLoss.toFixed(2));
    console.log(this.postEfficiencyLoss, 'MIAOW');
  }

  missingEmployeeCostForTimestamp(): void {
    this.missingEmployeeLoss =
      -((this.gewinnProMa ?? this.defaultGewinnProMa) / 12) *
      ((this.wiederbesetzungMonate ?? this.defaultWiederbesetzungMonate) -
        (this.ankuendigungKuendigungMonate ??
          this.defaultAnkuendigungKuendigungMonate));
    this.missingEmployeeLoss = Number(this.missingEmployeeLoss.toFixed(2));
    console.log(this.missingEmployeeLoss, 'wuff wuff');
  }

  efficiencyLossDuringNewIncorporation(): void {
    this.efficiencyLossIncorporation =
      (-(
        (((this.gewinnProMa ?? this.defaultGewinnProMa) +
          (this.gehaltProMa ?? this.defaultGehaltProMa)) /
          12) *
        (this.einarbeitungszeitMonate ?? this.defaultEinarbeitungszeitMonate)
      ) /
        100) *
      40;
    this.efficiencyLossIncorporation = Number(
      this.efficiencyLossIncorporation.toFixed(2)
    );
    console.log(this.efficiencyLossIncorporation, 'adrian');
  }

  totalCostPerEmployeeReplacement(): void {
    if (
      this.missingEmployeeLoss !== undefined &&
      this.efficiencyLossIncorporation !== undefined &&
      this.preEfficiencyLoss !== undefined &&
      this.postEfficiencyLoss !== undefined &&
      this.defaultNegativeKostenRekrutierungMA !== undefined
    ) {
      this.totalRecruitmentCost =
        this.missingEmployeeLoss +
        this.efficiencyLossIncorporation +
        this.preEfficiencyLoss +
        this.postEfficiencyLoss -
        this.defaultNegativeKostenRekrutierungMA;
      console.log(this.totalRecruitmentCost, 'TARANTELLE');
      this.totalRecruitmentCost = Number(this.totalRecruitmentCost.toFixed(2));
    } else {
      this.totalRecruitmentCost = undefined;
    }
  }

  totalCostOfAllEmployeeReplacement(): void {
    if (this.totalRecruitmentCost !== undefined) {
      this.completeCostReplacement =
        (this.abgaengeLetztesJahr ?? this.defaultAbgaengeLetztesJahr) *
        this.totalRecruitmentCost;
      console.log(this.completeCostReplacement, 'simba');
      this.completeCostReplacement = Number(
        this.completeCostReplacement.toFixed(2)
      );
    } else {
      this.completeCostReplacement = undefined;
    }
  }

  targetReduceSickDays(): void {
    if (this.totalEmployeeCost !== undefined) {
      this.reduceSickDaysPercentage =
        (-this.totalEmployeeCost / 100) *
        (this.percentageIllness ?? this.defaultPercentageIllness);
      console.log(this.reduceSickDaysPercentage, 'PALMEN');
      this.reduceSickDaysPercentage = Number(
        this.reduceSickDaysPercentage.toFixed(2)
      );
    } else {
      this.reduceSickDaysPercentage = undefined;
    }
  }

  targetReduceEmployeeReplacement(): void {
    if (this.completeCostReplacement !== undefined) {
      this.reduceEmployeeReplacementPercentage =
        (-this.completeCostReplacement / 100) *
        (this.percentageReplacement ?? this.defaultPercentageReplacement);
      console.log(this.reduceEmployeeReplacementPercentage, 'CALIFORNICATION');
      this.reduceEmployeeReplacementPercentage = Number(
        this.reduceEmployeeReplacementPercentage.toFixed(2)
      );
    } else {
      this.reduceEmployeeReplacementPercentage = undefined;
    }
  }

  savingPotentialPerYear(): void {
    if (
      this.reduceEmployeeReplacementPercentage !== undefined &&
      this.reduceSickDaysPercentage !== undefined
    ) {
      this.savingIllnessAndEmployeeReplacementAmount =
        this.reduceEmployeeReplacementPercentage +
        this.reduceSickDaysPercentage;
      console.log(this.savingIllnessAndEmployeeReplacementAmount, 'OTHERSIDE');
      this.savingIllnessAndEmployeeReplacementAmount = Number(
        this.savingIllnessAndEmployeeReplacementAmount.toFixed(2)
      );
    } else {
      this.savingIllnessAndEmployeeReplacementAmount = undefined;
    }
  }
  getSavingPotential() {
    return this.savingIllnessAndEmployeeReplacementAmount ?? '---';
  }

  calculatePotentialRoiWithKibun(): void {
    if (this.savingIllnessAndEmployeeReplacementAmount !== undefined) {
      this.potentialRoi =
        (this.savingIllnessAndEmployeeReplacementAmount /
          this.kibunLizenzProJahr -
          1) *
        100;
      console.log(this.potentialRoi, 'SUMMERTIME');
      this.potentialRoi = Number(this.potentialRoi.toFixed(2));
    } else {
      this.potentialRoi = undefined;
    }
  }
  subtractionMethod(): number {
    return (
      this.defaultWiederbesetzungMonate -
      this.defaultAnkuendigungKuendigungMonate
    );
  }

  calculateAbgaengeByPercentage(): number {
    return this.defaultAnzahlArbeiter * this.defaultAbgaengeLetztesJahr;
  }

  callAllMethods(): void {
    console.log(
      'xxxDebug',
      this.defaultNegativeKostenRekrutierungMA,
      this.negativeKostenRekrutierungMA
    );

    this.kostenRekrutierungMA = -(this.negativeKostenRekrutierungMA =
      this.defaultNegativeKostenRekrutierungMA);

    this.dailyCostPerEmployee();
    this.dailyProfitLossPerEmployee();
    this.totalYearlyCostPerEmployee();
    this.totalYearlyCostAllEmployees();
    this.efficiencyLossBeforeResignationNotice();
    this.efficiencyLossAfterResignationNotice();
    this.missingEmployeeCostForTimestamp();
    this.efficiencyLossDuringNewIncorporation();
    this.totalCostPerEmployeeReplacement();
    this.totalCostOfAllEmployeeReplacement();
    this.targetReduceSickDays();
    this.targetReduceEmployeeReplacement();
    this.savingPotentialPerYear();
    this.calculatePotentialRoiWithKibun();
    this.calculateAbgaengeByPercentage();
  }
}
