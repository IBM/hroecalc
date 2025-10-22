<template>
  <div class="formula">
    <div>
      <h3 id="hroeformula">ROI in AI Ethics</h3>
      <div id="paperSection">
        
      </div>
      <div class="fraction" id="formula">

        <div class="numerator">
          <span id="sum1">
            <em>ROI<sub>t,N,m</sub> = <br /><br />
              <div class="shift right" style="--shift-value: 12px;">( ∑</div>
              <span id="Ny" class="tooltip-target"><sup class="shift right"
                  style="--shift-value: 16px;">t+N</sup><sub class="shift left"
                  style="--shift-value: 16px;">j=t</sub></span>
              <span id="Alpha" class="tooltip-target">
                <div class="shift left enlargefont"
                    style="--shift-value: 6px; --fontsize: 30px">α</div><sub
                    class="shift left" style="--shift-value: 5px;">j-t</sub>
              </span>
              [<span id="Re" class="tooltip-target">R<sup class="shift right"
                  style="--shift-value:1px;">e</sup><sub class="shift left"
                  style="--shift-value: 8px;">j</sub>(I<sub>t</sub>&nbsp;)</span>
              + <span id="Rr" class="tooltip-target">R<sup class="shift right"
                  style="--shift-value: 2px;">r</sup><sub class="shift left"
                  style="--shift-value: 6px;">j</sub>(I<sub>t</sub>&nbsp;)</span>
              + ∑<sup class="shift right" style="--shift-value: 6px;">m</sup><sub
                class="shift left" style="--shift-value: 10px;">k=1</sub>
              <span id="Rc" class="tooltip-target">R<sup class="shift right"
                  style="--shift-value: 2px;">c</sup><sub class="shift left"
                  style="--shift-value: 8px;">t,k</sub>(γ<sub>k</sub>
                <div class="shift right" style="--shift-value: 2px;">I</div><sup
                    class="shift right" style="--shift-value: 4px;">c</sup><sub
                    class="shift left" style="--shift-value:6px;">t</sub>)
              </span>])
              - (<span id="It1" class="tooltip-target">I<sub>t</sub></span>
              + <span id="Ic_t1" class="tooltip-target">I<sup class="shift right"
                  style="--shift-value: 2px;">c</sup><sub class="shift left"
                  style="--shift-value: 8px;">t</sub>)
                </span>
            </em>
          </span>
        </div>
        <hr id="dividerFull">
        <div class="denominator">
          <em><span id="It2" class="tooltip-target">I<sub>t</sub></span>
            + <span id="Ic_t2" class="tooltip-target">I<sup class="shift right"
                style="--shift-value: 2px;">c</sup><sub class="shift left"
                style="--shift-value: 8px;">t</sub></span></em>
        </div>
        <div id="formulaExplanationContainer">
          <div id="formula_explanation">
            The full ROI in AI Ethics formula considers Economic Returns, Reputational
            Returns, and
            Capability Returns, as well as Capability Costs.
            It calculates the ROI based on these factors, discounting future
            returns using the discount factor.
            The formula incorporates:
            <ul>
              <li>
                <div class="bluefont">Economic Returns (Re)</div>: Returns from
                economic benefits,
                including fine avoidance (e.g., fine received for non-compliance
                with regulation).
              </li>
              <li>
                <div class="bluefont">Reputational Returns (Rr)</div>: Returns from
                reputation.
              </li>
              <li>
                <div class="bluefont">Capability Returns (Rc)</div>: Returns from
                increased capabilities.
              </li>
            </ul>
            
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'FormulaDisplay'
}
</script>