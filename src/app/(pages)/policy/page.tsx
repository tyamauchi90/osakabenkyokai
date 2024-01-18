import { ReactNode } from "react";

export default function PolicyPage() {
  const Definition = ({
    title,
    content,
  }: {
    title: string;
    content: string | ReactNode;
  }) => {
    return (
      <>
        <dt className="text-xl tracking-wider pt-10">{title}</dt>
        <dd className="text-base tracking-wider leading-loose ml-4">
          {content}
        </dd>
      </>
    );
  };

  return (
    <>
      <div className="container py-12">
        <h1 className="text-4xl text-center my-7">利用規約</h1>
        <dl className="space-y-4">
          <Definition
            title="利用規約への同意"
            content="この利用規約（以下「本規約」といいます。）は、おおさか勉強会（以下、「当サークル」といいます。）がこのウェブサイト上で提供するサービス（以下「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。"
          />
          <Definition
            title="第1条（適用）"
            content={
              <>
                <ul className="list-decimal ml-8">
                  <li>
                    本規約は、ユーザーと当サークルとの間の本サービスの利用に関わる一切の関係に適用されるものとします。
                  </li>
                  <li>
                    当サークルは本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
                  </li>
                  <li>
                    本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
                  </li>
                </ul>
              </>
            }
          />
          <Definition
            title="第2条（利用登録）"
            content={
              <>
                <ul className="list-decimal ml-8">
                  <li>
                    本サービスにおいては、登録希望者が本規約に同意の上、当サークルの定める方法によって利用登録を申請し、当サークルがこれを承認することによって、利用登録が完了するものとします。
                  </li>
                  <li>
                    当サークルは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
                    <ul className="list-decimal ml-8">
                      <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                      <li>本規約に違反したことがある者からの申請である場合</li>
                      <li>
                        その他、当サークルが利用登録を相当でないと判断した場合
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            }
          />
          <Definition
            title="第3条（ユーザーIDおよびパスワードの管理）"
            content={
              <>
                <ul className="list-decimal ml-8">
                  <li>
                    ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
                  </li>
                  <li>
                    ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。当サークルは、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
                  </li>
                  <li>
                    ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、当サークルに故意又は重大な過失がある場合を除き、当サークルは一切の責任を負わないものとします。
                  </li>
                </ul>
              </>
            }
          />
          <Definition
            title="第4条（利用料金および支払方法）"
            content={
              <>
                <ul className="list-decimal ml-8">
                  <li>
                    ユーザーは、本サービスの有料部分の対価として、当サークルが別途定め、本ウェブサイトに表示する利用料金を、当サークルが指定する方法により支払うものとします。
                  </li>
                  <li>
                    ユーザーが利用料金の支払を遅滞した場合には、ユーザーは年14．6％の割合による遅延損害金を支払うものとします。
                  </li>
                </ul>
              </>
            }
          />
          <Definition
            title="第5条（禁止事項）"
            content={
              <>
                <p>
                  ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
                </p>
                <ul className="list-decimal ml-8">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>犯罪行為に関連する行為</li>
                  <li>
                    本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為
                  </li>
                  <li>
                    当サークル、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
                  </li>
                  <li>本サービスによって得られた情報を商業的に利用する行為</li>
                  <li>当サークルのサービスの運営を妨害するおそれのある行為</li>
                  <li>不正アクセスをし、またはこれを試みる行為</li>
                  <li>
                    他のユーザーに関する個人情報等を収集または蓄積する行為
                  </li>
                  <li>不正な目的を持って本サービスを利用する行為</li>
                  <li>
                    本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為
                  </li>
                  <li>他のユーザーに成りすます行為</li>
                  <li>
                    当サービスが許諾しない本サービス上での宣伝、広告、勧誘、または営業行為
                  </li>
                  <li>面識のない異性との出会いを目的とした行為</li>
                  <li>
                    当サークルのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
                  </li>
                  <li>その他、当サークルが不適切と判断する行為</li>
                </ul>
              </>
            }
          />
          <Definition
            title="第6条（本サービスの提供の停止等）"
            content={
              <>
                <ul className="list-decimal ml-8">
                  <li>
                    当サークルは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                    <ul className="list-decimal ml-8">
                      <li>
                        本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
                      </li>
                      <li>
                        地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
                      </li>
                      <li>
                        コンピュータまたは通信回線等が事故により停止した場合
                      </li>
                      <li>
                        その他、当サークルが本サービスの提供が困難と判断した場合
                      </li>
                    </ul>
                  </li>
                  <li>
                    当サークルは、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
                  </li>
                </ul>
              </>
            }
          />
          <Definition
            title="第7条（利用制限および登録抹消）"
            content={
              <>
                <ul className="list-decimal ml-8">
                  <li>
                    当サークルは、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
                    <ul className="list-decimal ml-8">
                      <li>本規約のいずれかの条項に違反した場合</li>
                      <li>登録事項に虚偽の事実があることが判明した場合</li>
                      <li>料金等の支払債務の不履行があった場合</li>
                      <li>
                        当サークルからの連絡に対し、一定期間返答がない場合
                      </li>
                      <li>
                        本サービスについて、最終の利用から一定期間利用がない場合
                      </li>
                      <li>
                        その他、当サークルが本サービスの利用を適当でないと判断した場合
                      </li>
                    </ul>
                  </li>
                  <li>
                    当サークルは、本条に基づき当サークルが行った行為によりユーザーに生じた損害について、一切の責任を負いません。
                  </li>
                </ul>
              </>
            }
          />
          <Definition
            title="第8条（退会）"
            content="ユーザーは、当サークルの定める退会手続により、本サービスから退会できるものとします。"
          />
          <Definition
            title="第9条（保証の否認および免責事項）"
            content={
              <>
                <ul className="list-decimal ml-8">
                  <li>
                    当サークルは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
                  </li>
                  <li>
                    当サークルは、本サービスに起因してユーザーに生じたあらゆる損害について、当サークルの故意又は重過失による場合を除き、一切の責任を負いません。ただし、本サービスに関する当サークルとユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
                  </li>
                  <li>
                    前項ただし書に定める場合であっても、当サークルは、当サークルの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当サークルまたはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。また、当サークルの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は、ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
                  </li>
                  <li>
                    当サークルは、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
                  </li>
                </ul>
              </>
            }
          />
          <Definition
            title="第10条（サービス内容の変更等）"
            content="当サークルは、ユーザーへの事前の告知なく、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。ただし、本サービスの内容に重大な変更がある場合、ユーザーに対して事前に通知します。重大な変更とは、本サービスの利用に影響を及ぼす可能性のある変更を指します。"
          />
          <Definition
            title="第11条（利用規約の変更）"
            content={
              <>
                <ul className="list-decimal ml-8">
                  <li>
                    当サークルは以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
                    <ul className="list-decimal ml-8">
                      <li>
                        本規約の変更がユーザーの一般の利益に適合するとき。
                      </li>
                      <li>
                        本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。
                      </li>
                    </ul>
                  </li>
                  <li>
                    当サークルはユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
                  </li>
                </ul>
              </>
            }
          />
          <Definition
            title="第12条（個人情報の取扱い）"
            content="当サークルは、本サービスの利用によって取得する個人情報については、当サークル「プライバシーポリシー」（後述）に従い適切に取り扱うものとします。"
          />
          <Definition
            title="第13条（通知または連絡）"
            content="ユーザーと当サークルとの間の通知または連絡は、当サークルの定める方法によって行うものとします。当サークルは、ユーザーから、当サークルが別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。"
          />
          <Definition
            title="第14条（権利義務の譲渡の禁止）"
            content="ユーザーは、当サークルの書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。"
          />
          <Definition
            title="第15条（準拠法・裁判管轄）"
            content={
              <>
                <ul className="list-decimal ml-8">
                  <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
                  <li>
                    本サービスに関して紛争が生じた場合には、当サークルの所在地を管轄する裁判所を専属的合意管轄とします。
                  </li>
                </ul>
              </>
            }
          />
        </dl>
        <hr className="border-gray-100 my-12" />
        <h1 className="text-4xl text-center my-7">プライバシーポリシー</h1>
        <dl className="space-y-4">
          <Definition title="サービス提供元" content="おおさか勉強会" />
          <Definition title="所在地" content="請求があれば遅滞なく開示します" />
          <Definition
            title="電話番号"
            content="請求があれば遅滞なく開示します"
          />
          <Definition title="メールアドレス" content="pecopon24@gmail.com" />
          <Definition title="運営統括責任者" content="山内敏貴" />
          <Definition
            title="追加手数料等の追加料金"
            content="Stripe決済手数料（3.6%）"
          />
          <Definition
            title="返金ポリシー"
            content="お支払い金額の3.6%を引いた額を返金します。"
          />
          {/* <Definition
            title="引渡時期"
            content="セミナー参加費を支払った時点で、参加資格が確定します。"
          /> */}
          <Definition
            title="受け付け可能な決済手段"
            content="クレジットカード（Stripe経由）"
          />
          <Definition
            title="決済期間"
            content="クレジットカード決済の場合は即時、銀行振込の場合は注文から3日以内にお振り込みいただく必要があります。"
          />
          <Definition
            title="価格"
            content="各セミナー参加費は1,000円とします。"
          />
        </dl>
      </div>
    </>
  );
}
