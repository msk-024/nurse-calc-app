// ヘルプの内容まとめ
export interface HelpContent {
  caution: string; // 注意文（現在の短文）
  tips?: string; // アセスメントや背景理解のヒント
  reference?: string; // 追加：出典リンク／文献名
}

// 説明文案
export const helpTexts: Record<string, HelpContent> = {
  fluid: {
    caution:
      "※この計算結果はあくまで目安値です。患者の臨床状態（例：脱水、有利尿、浮腫など）によって必要量は変動します。",
    tips: `- 脱水傾向（例：発熱・嘔吐・下痢）では補液量を慎重に調整し、体重・尿量・電解質をモニタリング。  
- 浮腫・心不全・腎機能低下例では過剰補液による呼吸苦・浮腫増悪に注意。  
- 看護ポイントとして「1日あたりの体重変化」「入力・出力（I/O）」「血圧・心拍変化」を連動して観察します。  
    `,
    reference:
      "Nutrition Education Materials Online (NEMO). Estimating energy, protein & fluid requirements for adult clinical conditions. 2022. https://www.health.qld.gov.au/__data/assets/pdf_file/0022/144175/est-req.pdf",
  },
  transfusion: {
    caution:
      "※目標Hb値・輸血適応は施設・医師の指示によって異なります。計算値は変更不要・確認用として扱ってください。",
    tips: `- 輸血適応では「出血量」「循環動態」「基礎疾患（例：心疾患・腎疾患）」「貧血の原因（例：鉄欠乏・溶血）」を総合的に評価。  
- 看護ポイント：輸血開始時のアレルギー／溶血徴候・心拍数・血圧・体温・尿量をモニタリング。輸血後1 〜 2時間でHbの上昇を確認。  
    `,
    reference:
      "American Academy of Family Physicians. Diagnosis and Management of Hyponatremia. 2015. https://www.aafp.org/pubs/afp/issues/2015/0301/p299.html",
    // *Note: 直接「輸血ガイドライン」ではないため、必要あれば該当ガイドラインに差し替えを検討
  },
  nutrition: {
    caution:
      "※この推定値は栄養状態・疾患・年齢・活動量によって変わります。治療・管理方針に応じて専門栄養士・医師と連携してください。",
    tips: `- 栄養アセスメントでは「体重変化・BMI・筋肉量」「食事・経口摂取量」「疾患・治療内容（術後・化学療法・慢性疾患）」「血液検査（アルブミン・トランスフェリン等）」をチェック。  
- 看護ポイント：経口摂取量が少ない・体重減少著明・高齢者では「30 kcal/kg/日以上」「1.2 g/kg/日以上」などの目安を参考としつつ、定期的な再評価を行います。  
    `,
    reference:
      "Kesari A, et al. Nutritional Assessment. StatPearls. 2023. https://www.ncbi.nlm.nih.gov/books/NBK580496/",
  },
  bsa: {
    caution:
      "※体表面積（BSA）はあくまで薬剤用量・検査指標などの補助として使用されます。小児・高齢者・極端体格では異なった補正が必要となる場合があります。",
    tips: `- 多くの施設で「Mosteller式：BSA(m²) = √[体重(kg) × 身長(cm)／3600]」が簡便式として用いられます。  
- 看護ポイント：薬剤投与時にはBSA基準か施設プロトコルかを確認。腎機能・肝機能・体格極端例では誤差の可能性あり。  
    `,
    reference:
      "Flint B. Body Surface Area. StatPearls. 2023. https://www.ncbi.nlm.nih.gov/books/NBK559005/",
  },
  bmi: {
    caution:
      "※BMI（体格指数）は「体重(kg) ÷ 身長(m)²」で算出され、肥満・低体重のスクリーニングには有効ですが、筋肉量・体脂肪・体脂肪分布を直接反映しません。",
    tips: `- 18.5 kg/m²未満：低体重、18.5〜24.9：標準、25〜29.9：過体重、30以上：肥満とされる一般基準（成人）です。  
  出典：BetterHealth Vic. 2024.  
- 看護ポイント：BMIが正常でも腹部脂肪・筋肉量低下（サルコペニア）を伴う例では別指標（例：ウエスト周囲長）も考慮。体重変化・歩行能力・筋力チェックを併用すると実践的です。  
    `,
    reference:
      "Centers for Disease Control and Prevention (CDC). About Body Mass Index (BMI). 2024. https://www.cdc.gov/bmi/about/index.html",
  },
  "electrolyte-na": {
    caution:
      "※血清Na（ナトリウム）補正計算では、急速な補正により「浸透圧性脱髄症候群（ODS）」のリスクがあるため、施設プロトコル・医師指示を必ず遵守してください。",
    tips: `- 慢性低Na血症では、一般に **24時間あたり8〜10 mmol/L以下** の増加を上限とする推奨があります。  
  出典：Treatment Guidelines for Hyponatremia. 2024.  
- 看護ポイント：補正中は「尿量急増」「ADH低下」「利尿薬使用」「アルコール多飲」「肝・腎機能低下」があると過補正リスク増。頻回のNaモニタと体重・脳症症状の観察が重要。  
    `,
    reference:
      "Liam C. et al. Treatment Guidelines for Hyponatremia: Stay the Course. CJASN. 2024. https://journals.lww.com/cjasn/fulltext/2024/01000/treatment_guidelines_for_hyponatremia__stay_the.21.aspx",
  },
  "electrolyte-k": {
    caution:
      "※血清K（カリウム）補正は、過補正・静脈投与速度超過・腎機能低下での蓄積による致死的不整脈リスクがあります。施設の高リスク薬プロトコルに従ってください。",
    tips: `- K補正時には「末梢投与では1時間あたり10 mEq以内」「心モニタ必須」「腎機能・尿量・利尿薬・代謝性アシドーシスの有無を確認」が実践されます。  
  出典：Hypokalemia: A clinical update. PMC.  
- 看護ポイント：心電図変化（U波・T波平坦・ST低下）・筋力低下・便秘・利尿剤併用の有無を観察し、K補正後の「再測定」・「蓄積リスクの評価」を行います。  
    `,
    reference:
      "StatPearls. Hypokalemia. 2023. https://www.ncbi.nlm.nih.gov/books/NBK482465/",
  },
};
