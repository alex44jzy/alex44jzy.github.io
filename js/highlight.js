var hljs = new function() {
  function k(v) {
    return v.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
  }

  function t(v) {
    return v.nodeName.toLowerCase()
  }

  function i(w, x) {
    var v = w && w.exec(x);
    return v && v.index == 0
  }

  function d(v) {
    return Array.prototype.map.call(v.childNodes, function(w) {
      if (w.nodeType == 3) {
        return b.useBR ? w.nodeValue.replace(/\n/g, "") : w.nodeValue
      }
      if (t(w) == "br") {
        return "\n"
      }
      return d(w)
    }).join("")
  }

  function r(w) {
    var v = (w.className + " " + (w.parentNode ? w.parentNode.className : "")).split(/\s+/);

    v = v.map(function(x) {
      return x.replace(/^language-/, "")
    });
    var vv = v.filter(function(x) {
      return j(x) || x == "no-highlight"
    })[0];
    return vv;
  }

  function o(x, y) {
    var v = {};
    for (var w in x) {
      v[w] = x[w]
    }
    if (y) {
      for (var w in y) {
        v[w] = y[w]
      }
    }
    return v
  }

  function u(x) {
    var v = [];
    (function w(y, z) {
      for (var A = y.firstChild; A; A = A.nextSibling) {
        if (A.nodeType == 3) {
          z += A.nodeValue.length
        } else {
          if (t(A) == "br") {
            z += 1
          } else {
            if (A.nodeType == 1) {
              v.push({
                event: "start",
                offset: z,
                node: A
              });
              z = w(A, z);
              v.push({
                event: "stop",
                offset: z,
                node: A
              })
            }
          }
        }
      }
      return z
    })(x, 0);
    return v
  }

  function q(w, y, C) {
    var x = 0;
    var F = "";
    var z = [];

    function B() {
      if (!w.length || !y.length) {
        return w.length ? w : y
      }
      if (w[0].offset != y[0].offset) {
        return (w[0].offset < y[0].offset) ? w : y
      }
      return y[0].event == "start" ? w : y
    }

    function A(H) {
      function G(I) {
        return " " + I.nodeName + '="' + k(I.value) + '"'
      }
      F += "<" + t(H) + Array.prototype.map.call(H.attributes, G).join("") + ">"
    }

    function E(G) {
      F += "</" + t(G) + ">"
    }

    function v(G) {
      (G.event == "start" ? A : E)(G.node)
    }
    while (w.length || y.length) {
      var D = B();
      F += k(C.substr(x, D[0].offset - x));
      x = D[0].offset;
      if (D == w) {
        z.reverse().forEach(E);
        do {
          v(D.splice(0, 1)[0]);
          D = B()
        } while (D == w && D.length && D[0].offset == x);
        z.reverse().forEach(A)
      } else {
        if (D[0].event == "start") {
          z.push(D[0].node)
        } else {
          z.pop()
        }
        v(D.splice(0, 1)[0])
      }
    }
    return F + k(C.substr(x))
  }

  function m(y) {
    function v(z) {
      return (z && z.source) || z
    }

    function w(A, z) {
      return RegExp(v(A), "m" + (y.cI ? "i" : "") + (z ? "g" : ""))
    }

    function x(D, C) {
      if (D.compiled) {
        return
      }
      D.compiled = true;
      D.k = D.k || D.bK;
      if (D.k) {
        var z = {};

        function E(G, F) {
          if (y.cI) {
            F = F.toLowerCase()
          }
          F.split(" ").forEach(function(H) {
            var I = H.split("|");
            z[I[0]] = [G, I[1] ? Number(I[1]) : 1]
          })
        }
        if (typeof D.k == "string") {
          E("keyword", D.k)
        } else {
          Object.keys(D.k).forEach(function(F) {
            E(F, D.k[F])
          })
        }
        D.k = z
      }
      D.lR = w(D.l || /\b[A-Za-z0-9_]+\b/, true);
      if (C) {
        if (D.bK) {
          D.b = D.bK.split(" ").join("|")
        }
        if (!D.b) {
          D.b = /\B|\b/
        }
        D.bR = w(D.b);
        if (!D.e && !D.eW) {
          D.e = /\B|\b/
        }
        if (D.e) {
          D.eR = w(D.e)
        }
        D.tE = v(D.e) || "";
        if (D.eW && C.tE) {
          D.tE += (D.e ? "|" : "") + C.tE
        }
      }
      if (D.i) {
        D.iR = w(D.i)
      }
      if (D.r === undefined) {
        D.r = 1
      }
      if (!D.c) {
        D.c = []
      }
      var B = [];
      D.c.forEach(function(F) {
        if (F.v) {
          F.v.forEach(function(G) {
            B.push(o(F, G))
          })
        } else {
          B.push(F == "self" ? D : F)
        }
      });
      D.c = B;
      D.c.forEach(function(F) {
        x(F, D)
      });
      if (D.starts) {
        x(D.starts, C)
      }
      var A = D.c.map(function(F) {
        return F.bK ? "\\.?\\b(" + F.b + ")\\b\\.?" : F.b
      }).concat([D.tE]).concat([D.i]).map(v).filter(Boolean);
      D.t = A.length ? w(A.join("|"), true) : {
        exec: function(F) {
          return null
        }
      };
      D.continuation = {}
    }
    x(y)
  }

  function c(S, L, J, R) {
    function v(U, V) {
      for (var T = 0; T < V.c.length; T++) {
        if (i(V.c[T].bR, U)) {
          return V.c[T]
        }
      }
    }

    function z(U, T) {
      if (i(U.eR, T)) {
        return U
      }
      if (U.eW) {
        return z(U.parent, T)
      }
    }

    function A(T, U) {
      return !J && i(U.iR, T)
    }

    function E(V, T) {
      var U = M.cI ? T[0].toLowerCase() : T[0];
      return V.k.hasOwnProperty(U) && V.k[U]
    }

    function w(Z, X, W, V) {
      var T = V ? "" : b.classPrefix,
        U = '<span class="' + T,
        Y = W ? "" : "</span>";
      U += Z + '">';
      return U + X + Y
    }

    function N() {
      var U = k(C);
      if (!I.k) {
        return U
      }
      var T = "";
      var X = 0;
      I.lR.lastIndex = 0;
      var V = I.lR.exec(U);
      while (V) {
        T += U.substr(X, V.index - X);
        var W = E(I, V);
        if (W) {
          H += W[1];
          T += w(W[0], V[0])
        } else {
          T += V[0]
        }
        X = I.lR.lastIndex;
        V = I.lR.exec(U)
      }
      return T + U.substr(X)
    }

    function F() {
      if (I.sL && !f[I.sL]) {
        return k(C)
      }
      var T = I.sL ? c(I.sL, C, true, I.continuation.top) : g(C);
      if (I.r > 0) {
        H += T.r
      }
      if (I.subLanguageMode == "continuous") {
        I.continuation.top = T.top
      }
      return w(T.language, T.value, false, true)
    }

    function Q() {
      return I.sL !== undefined ? F() : N()
    }

    function P(V, U) {
      var T = V.cN ? w(V.cN, "", true) : "";
      if (V.rB) {
        D += T;
        C = ""
      } else {
        if (V.eB) {
          D += k(U) + T;
          C = ""
        } else {
          D += T;
          C = U
        }
      }
      I = Object.create(V, {
        parent: {
          value: I
        }
      })
    }

    function G(T, X) {
      C += T;
      if (X === undefined) {
        D += Q();
        return 0
      }
      var V = v(X, I);
      if (V) {
        D += Q();
        P(V, X);
        return V.rB ? 0 : X.length
      }
      var W = z(I, X);
      if (W) {
        var U = I;
        if (!(U.rE || U.eE)) {
          C += X
        }
        D += Q();
        do {
          if (I.cN) {
            D += "</span>"
          }
          H += I.r;
          I = I.parent
        } while (I != W.parent);
        if (U.eE) {
          D += k(X)
        }
        C = "";
        if (W.starts) {
          P(W.starts, "")
        }
        return U.rE ? 0 : X.length
      }
      if (A(X, I)) {
        throw new Error('Illegal lexeme "' + X + '" for mode "' + (I.cN || "<unnamed>") + '"')
      }
      C += X;
      return X.length || 1
    }
    var M = j(S);
    if (!M) {
      throw new Error('Unknown language: "' + S + '"')
    }
    m(M);
    var I = R || M;
    var D = "";
    for (var K = I; K != M; K = K.parent) {
      if (K.cN) {
        D = w(K.cN, D, true)
      }
    }
    var C = "";
    var H = 0;
    try {
      var B, y, x = 0;
      while (true) {
        I.t.lastIndex = x;
        B = I.t.exec(L);
        if (!B) {
          break
        }
        y = G(L.substr(x, B.index - x), B[0]);
        x = B.index + y
      }
      G(L.substr(x));
      for (var K = I; K.parent; K = K.parent) {
        if (K.cN) {
          D += "</span>"
        }
      }
      return {
        r: H,
        value: D,
        language: S,
        top: I
      }
    } catch (O) {
      if (O.message.indexOf("Illegal") != -1) {
        return {
          r: 0,
          value: k(L)
        }
      } else {
        throw O
      }
    }
  }

  function g(y, x) {
    x = x || b.languages || Object.keys(f);
    var v = {
      r: 0,
      value: k(y)
    };
    var w = v;
    x.forEach(function(z) {
      if (!j(z)) {
        return
      }
      var A = c(z, y, false);
      A.language = z;
      if (A.r > w.r) {
        w = A
      }
      if (A.r > v.r) {
        w = v;
        v = A
      }
    });
    if (w.language) {
      v.second_best = w
    }
    return v
  }

  function h(v) {
    if (b.tabReplace) {
      v = v.replace(/^((<[^>]+>|\t)+)/gm, function(w, z, y, x) {
        return z.replace(/\t/g, b.tabReplace)
      })
    }
    if (b.useBR) {
      v = v.replace(/\n/g, "<br>")
    }
    return v
  }

  function p(z) {
    var y = d(z);
    var A = r(z);
    if (A == "no-highlight" || typeof A == "undefined") {
      return
    }
    var v = A ? c(A, y, true) : g(y);
    var w = u(z);
    if (w.length) {
      var x = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
      x.innerHTML = v.value;
      v.value = q(w, u(x), y)
    }
    v.value = h(v.value);
    z.innerHTML = v.value;
    z.className += " hljs " + (!A && v.language || "");
    z.result = {
      language: v.language,
      re: v.r
    };
    if (v.second_best) {
      z.second_best = {
        language: v.second_best.language,
        re: v.second_best.r
      }
    }
  }
  var b = {
    classPrefix: "hljs-",
    tabReplace: null,
    useBR: false,
    languages: undefined
  };

  function s(v) {
    b = o(b, v)
  }

  function l() {
    if (l.called) {
      return
    }
    l.called = true;
    var v = document.querySelectorAll("pre code");
    Array.prototype.forEach.call(v, p)
  }

  function a() {
    addEventListener("DOMContentLoaded", l, false);
    addEventListener("load", l, false)
  }
  var f = {};
  var n = {};

  function e(v, x) {
    var w = f[v] = x(this);
    if (w.aliases) {
      w.aliases.forEach(function(y) {
        n[y] = v
      })
    }
  }

  function j(v) {
    return f[v] || f[n[v]]
  }
  this.highlight = c;
  this.highlightAuto = g;
  this.fixMarkup = h;
  this.highlightBlock = p;
  this.configure = s;
  this.initHighlighting = l;
  this.initHighlightingOnLoad = a;
  this.registerLanguage = e;
  this.getLanguage = j;
  this.inherit = o;
  this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
  this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
  this.NR = "\\b\\d+(\\.\\d+)?";
  this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
  this.BNR = "\\b(0b[01]+)";
  this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
  this.BE = {
    b: "\\\\[\\s\\S]",
    r: 0
  };
  this.ASM = {
    cN: "string",
    b: "'",
    e: "'",
    i: "\\n",
    c: [this.BE]
  };
  this.QSM = {
    cN: "string",
    b: '"',
    e: '"',
    i: "\\n",
    c: [this.BE]
  };
  this.CLCM = {
    cN: "comment",
    b: "//",
    e: "$"
  };
  this.CBLCLM = {
    cN: "comment",
    b: "/\\*",
    e: "\\*/"
  };
  this.HCM = {
    cN: "comment",
    b: "#",
    e: "$"
  };
  this.NM = {
    cN: "number",
    b: this.NR,
    r: 0
  };
  this.CNM = {
    cN: "number",
    b: this.CNR,
    r: 0
  };
  this.BNM = {
    cN: "number",
    b: this.BNR,
    r: 0
  };
  this.REGEXP_MODE = {
    cN: "regexp",
    b: /\//,
    e: /\/[gim]*/,
    i: /\n/,
    c: [this.BE, {
      b: /\[/,
      e: /\]/,
      r: 0,
      c: [this.BE]
    }]
  };
  this.TM = {
    cN: "title",
    b: this.IR,
    r: 0
  };
  this.UTM = {
    cN: "title",
    b: this.UIR,
    r: 0
  }
}();
hljs.registerLanguage("ruleslanguage", function(a) {
  return {
    k: {
      keyword: "BILL_PERIOD BILL_START BILL_STOP RS_EFFECTIVE_START RS_EFFECTIVE_STOP RS_JURIS_CODE RS_OPCO_CODE INTDADDATTRIBUTE|5 INTDADDVMSG|5 INTDBLOCKOP|5 INTDBLOCKOPNA|5 INTDCLOSE|5 INTDCOUNT|5 INTDCOUNTSTATUSCODE|5 INTDCREATEMASK|5 INTDCREATEDAYMASK|5 INTDCREATEFACTORMASK|5 INTDCREATEHANDLE|5 INTDCREATEOVERRIDEDAYMASK|5 INTDCREATEOVERRIDEMASK|5 INTDCREATESTATUSCODEMASK|5 INTDCREATETOUPERIOD|5 INTDDELETE|5 INTDDIPTEST|5 INTDEXPORT|5 INTDGETERRORCODE|5 INTDGETERRORMESSAGE|5 INTDISEQUAL|5 INTDJOIN|5 INTDLOAD|5 INTDLOADACTUALCUT|5 INTDLOADDATES|5 INTDLOADHIST|5 INTDLOADLIST|5 INTDLOADLISTDATES|5 INTDLOADLISTENERGY|5 INTDLOADLISTHIST|5 INTDLOADRELATEDCHANNEL|5 INTDLOADSP|5 INTDLOADSTAGING|5 INTDLOADUOM|5 INTDLOADUOMDATES|5 INTDLOADUOMHIST|5 INTDLOADVERSION|5 INTDOPEN|5 INTDREADFIRST|5 INTDREADNEXT|5 INTDRECCOUNT|5 INTDRELEASE|5 INTDREPLACE|5 INTDROLLAVG|5 INTDROLLPEAK|5 INTDSCALAROP|5 INTDSCALE|5 INTDSETATTRIBUTE|5 INTDSETDSTPARTICIPANT|5 INTDSETSTRING|5 INTDSETVALUE|5 INTDSETVALUESTATUS|5 INTDSHIFTSTARTTIME|5 INTDSMOOTH|5 INTDSORT|5 INTDSPIKETEST|5 INTDSUBSET|5 INTDTOU|5 INTDTOURELEASE|5 INTDTOUVALUE|5 INTDUPDATESTATS|5 INTDVALUE|5 STDEV INTDDELETEEX|5 INTDLOADEXACTUAL|5 INTDLOADEXCUT|5 INTDLOADEXDATES|5 INTDLOADEX|5 INTDLOADEXRELATEDCHANNEL|5 INTDSAVEEX|5 MVLOAD|5 MVLOADACCT|5 MVLOADACCTDATES|5 MVLOADACCTHIST|5 MVLOADDATES|5 MVLOADHIST|5 MVLOADLIST|5 MVLOADLISTDATES|5 MVLOADLISTHIST|5 IF FOR NEXT DONE SELECT END CALL ABORT CLEAR CHANNEL FACTOR LIST NUMBER OVERRIDE SET WEEK DISTRIBUTIONNODE ELSE WHEN THEN OTHERWISE IENUM CSV INCLUDE LEAVE RIDER SAVE DELETE NOVALUE SECTION WARN SAVE_UPDATE DETERMINANT LABEL REPORT REVENUE EACH IN FROM TOTAL CHARGE BLOCK AND OR CSV_FILE RATE_CODE AUXILIARY_DEMAND UIDACCOUNT RS BILL_PERIOD_SELECT HOURS_PER_MONTH INTD_ERROR_STOP SEASON_SCHEDULE_NAME ACCOUNTFACTOR ARRAYUPPERBOUND CALLSTOREDPROC GETADOCONNECTION GETCONNECT GETDATASOURCE GETQUALIFIER GETUSERID HASVALUE LISTCOUNT LISTOP LISTUPDATE LISTVALUE PRORATEFACTOR RSPRORATE SETBINPATH SETDBMONITOR WQ_OPEN BILLINGHOURS DATE DATEFROMFLOAT DATETIMEFROMSTRING DATETIMETOSTRING DATETOFLOAT DAY DAYDIFF DAYNAME DBDATETIME HOUR MINUTE MONTH MONTHDIFF MONTHHOURS MONTHNAME ROUNDDATE SAMEWEEKDAYLASTYEAR SECOND WEEKDAY WEEKDIFF YEAR YEARDAY YEARSTR COMPSUM HISTCOUNT HISTMAX HISTMIN HISTMINNZ HISTVALUE MAXNRANGE MAXRANGE MINRANGE COMPIKVA COMPKVA COMPKVARFROMKQKW COMPLF IDATTR FLAG LF2KW LF2KWH MAXKW POWERFACTOR READING2USAGE AVGSEASON MAXSEASON MONTHLYMERGE SEASONVALUE SUMSEASON ACCTREADDATES ACCTTABLELOAD CONFIGADD CONFIGGET CREATEOBJECT CREATEREPORT EMAILCLIENT EXPBLKMDMUSAGE EXPMDMUSAGE EXPORT_USAGE FACTORINEFFECT GETUSERSPECIFIEDSTOP INEFFECT ISHOLIDAY RUNRATE SAVE_PROFILE SETREPORTTITLE USEREXIT WATFORRUNRATE TO TABLE ACOS ASIN ATAN ATAN2 BITAND CEIL COS COSECANT COSH COTANGENT DIVQUOT DIVREM EXP FABS FLOOR FMOD FREPM FREXPN LOG LOG10 MAX MAXN MIN MINNZ MODF POW ROUND ROUND2VALUE ROUNDINT SECANT SIN SINH SQROOT TAN TANH FLOAT2STRING FLOAT2STRINGNC INSTR LEFT LEN LTRIM MID RIGHT RTRIM STRING STRINGNC TOLOWER TOUPPER TRIM NUMDAYS READ_DATE STAGING",
      built_in: "IDENTIFIER OPTIONS XML_ELEMENT XML_OP XML_ELEMENT_OF DOMDOCCREATE DOMDOCLOADFILE DOMDOCLOADXML DOMDOCSAVEFILE DOMDOCGETROOT DOMDOCADDPI DOMNODEGETNAME DOMNODEGETTYPE DOMNODEGETVALUE DOMNODEGETCHILDCT DOMNODEGETFIRSTCHILD DOMNODEGETSIBLING DOMNODECREATECHILDELEMENT DOMNODESETATTRIBUTE DOMNODEGETCHILDELEMENTCT DOMNODEGETFIRSTCHILDELEMENT DOMNODEGETSIBLINGELEMENT DOMNODEGETATTRIBUTECT DOMNODEGETATTRIBUTEI DOMNODEGETATTRIBUTEBYNAME DOMNODEGETBYNAME"
    },
    c: [a.CLCM, a.CBLCLM, a.ASM, a.QSM, a.CNM, {
      cN: "array",
      b: "#[a-zA-Z .]+"
    }]
  }
});
hljs.registerLanguage("ruby", function(e) {
  var h = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?";
  var g = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor";
  var a = {
    cN: "yardoctag",
    b: "@[A-Za-z]+"
  };
  var i = {
    cN: "comment",
    v: [{
      b: "#",
      e: "$",
      c: [a]
    }, {
      b: "^\\=begin",
      e: "^\\=end",
      c: [a],
      r: 10
    }, {
      b: "^__END__",
      e: "\\n$"
    }]
  };
  var c = {
    cN: "subst",
    b: "#\\{",
    e: "}",
    k: g
  };
  var d = {
    cN: "string",
    c: [e.BE, c],
    v: [{
      b: /'/,
      e: /'/
    }, {
      b: /"/,
      e: /"/
    }, {
      b: "%[qw]?\\(",
      e: "\\)"
    }, {
      b: "%[qw]?\\[",
      e: "\\]"
    }, {
      b: "%[qw]?{",
      e: "}"
    }, {
      b: "%[qw]?<",
      e: ">",
      r: 10
    }, {
      b: "%[qw]?/",
      e: "/",
      r: 10
    }, {
      b: "%[qw]?%",
      e: "%",
      r: 10
    }, {
      b: "%[qw]?-",
      e: "-",
      r: 10
    }, {
      b: "%[qw]?\\|",
      e: "\\|",
      r: 10
    }, {
      b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
    }]
  };
  var b = {
    cN: "params",
    b: "\\(",
    e: "\\)",
    k: g
  };
  var f = [d, i, {
    cN: "class",
    bK: "class module",
    e: "$|;",
    i: /=/,
    c: [e.inherit(e.TM, {
        b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
      }), {
        cN: "inheritance",
        b: "<\\s*",
        c: [{
          cN: "parent",
          b: "(" + e.IR + "::)?" + e.IR
        }]
      },
      i
    ]
  }, {
    cN: "function",
    bK: "def",
    e: " |$|;",
    r: 0,
    c: [e.inherit(e.TM, {
      b: h
    }), b, i]
  }, {
    cN: "constant",
    b: "(::)?(\\b[A-Z]\\w*(::)?)+",
    r: 0
  }, {
    cN: "symbol",
    b: ":",
    c: [d, {
      b: h
    }],
    r: 0
  }, {
    cN: "symbol",
    b: e.UIR + "(\\!|\\?)?:",
    r: 0
  }, {
    cN: "number",
    b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
    r: 0
  }, {
    cN: "variable",
    b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
  }, {
    b: "(" + e.RSR + ")\\s*",
    c: [i, {
      cN: "regexp",
      c: [e.BE, c],
      i: /\n/,
      v: [{
        b: "/",
        e: "/[a-z]*"
      }, {
        b: "%r{",
        e: "}[a-z]*"
      }, {
        b: "%r\\(",
        e: "\\)[a-z]*"
      }, {
        b: "%r!",
        e: "![a-z]*"
      }, {
        b: "%r\\[",
        e: "\\][a-z]*"
      }]
    }],
    r: 0
  }];
  c.c = f;
  b.c = f;
  return {
    k: g,
    c: f
  }
});
hljs.registerLanguage("haml", function(a) {
  return {
    cI: true,
    c: [{
      cN: "doctype",
      b: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
      r: 10
    }, {
      cN: "comment",
      b: "^\\s*(!=#|=#|-#|/).*$",
      r: 0
    }, {
      b: "^\\s*(-|=|!=)(?!#)",
      starts: {
        e: "\\n",
        sL: "ruby"
      }
    }, {
      cN: "tag",
      b: "^\\s*%",
      c: [{
        cN: "title",
        b: "\\w+"
      }, {
        cN: "value",
        b: "[#\\.]\\w+"
      }, {
        b: "{\\s*",
        e: "\\s*}",
        eE: true,
        c: [{
          b: ":\\w+\\s*=>",
          e: ",\\s+",
          rB: true,
          eW: true,
          c: [{
            cN: "symbol",
            b: ":\\w+"
          }, {
            cN: "string",
            b: '"',
            e: '"'
          }, {
            cN: "string",
            b: "'",
            e: "'"
          }, {
            b: "\\w+",
            r: 0
          }]
        }]
      }, {
        b: "\\(\\s*",
        e: "\\s*\\)",
        eE: true,
        c: [{
          b: "\\w+\\s*=",
          e: "\\s+",
          rB: true,
          eW: true,
          c: [{
            cN: "attribute",
            b: "\\w+",
            r: 0
          }, {
            cN: "string",
            b: '"',
            e: '"'
          }, {
            cN: "string",
            b: "'",
            e: "'"
          }, {
            b: "\\w+",
            r: 0
          }]
        }, ]
      }]
    }, {
      cN: "bullet",
      b: "^\\s*[=~]\\s*",
      r: 0
    }, {
      b: "#{",
      starts: {
        e: "}",
        sL: "ruby"
      }
    }]
  }
});
hljs.registerLanguage("haskell", function(f) {
  var g = {
    cN: "comment",
    v: [{
      b: "--",
      e: "$"
    }, {
      b: "{-",
      e: "-}",
      c: ["self"]
    }]
  };
  var e = {
    cN: "pragma",
    b: "{-#",
    e: "#-}"
  };
  var b = {
    cN: "preprocessor",
    b: "^#",
    e: "$"
  };
  var d = {
    cN: "type",
    b: "\\b[A-Z][\\w']*",
    r: 0
  };
  var c = {
    cN: "container",
    b: "\\(",
    e: "\\)",
    i: '"',
    c: [e, g, b, {
        cN: "type",
        b: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
      },
      f.inherit(f.TM, {
        b: "[_a-z][\\w']*"
      })
    ]
  };
  var a = {
    cN: "container",
    b: "{",
    e: "}",
    c: c.c
  };
  return {
    k: "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
    c: [{
        cN: "module",
        b: "\\bmodule\\b",
        e: "where",
        k: "module where",
        c: [c, g],
        i: "\\W\\.|;"
      }, {
        cN: "import",
        b: "\\bimport\\b",
        e: "$",
        k: "import|0 qualified as hiding",
        c: [c, g],
        i: "\\W\\.|;"
      }, {
        cN: "class",
        b: "^(\\s*)?(class|instance)\\b",
        e: "where",
        k: "class family instance where",
        c: [d, c, g]
      }, {
        cN: "typedef",
        b: "\\b(data|(new)?type)\\b",
        e: "$",
        k: "data family type newtype deriving",
        c: [e, g, d, c, a]
      }, {
        cN: "default",
        bK: "default",
        e: "$",
        c: [d, c, g]
      }, {
        cN: "infix",
        bK: "infix infixl infixr",
        e: "$",
        c: [f.CNM, g]
      }, {
        cN: "foreign",
        b: "\\bforeign\\b",
        e: "$",
        k: "foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
        c: [d, f.QSM, g]
      }, {
        cN: "shebang",
        b: "#!\\/usr\\/bin\\/env runhaskell",
        e: "$"
      },
      e, g, b, f.QSM, f.CNM, d, f.inherit(f.TM, {
        b: "^[_a-z][\\w']*"
      }), {
        b: "->|<-"
      }
    ]
  }
});
hljs.registerLanguage("xml", function(a) {
  var c = "[A-Za-z0-9\\._:-]+";
  var d = {
    b: /<\?(php)?(?!\w)/,
    e: /\?>/,
    sL: "php",
    subLanguageMode: "continuous"
  };
  var b = {
    eW: true,
    i: /</,
    r: 0,
    c: [d, {
      cN: "attribute",
      b: c,
      r: 0
    }, {
      b: "=",
      r: 0,
      c: [{
        cN: "value",
        v: [{
          b: /"/,
          e: /"/
        }, {
          b: /'/,
          e: /'/
        }, {
          b: /[^\s\/>]+/
        }]
      }]
    }]
  };
  return {
    aliases: ["html"],
    cI: true,
    c: [{
        cN: "doctype",
        b: "<!DOCTYPE",
        e: ">",
        r: 10,
        c: [{
          b: "\\[",
          e: "\\]"
        }]
      }, {
        cN: "comment",
        b: "<!--",
        e: "-->",
        r: 10
      }, {
        cN: "cdata",
        b: "<\\!\\[CDATA\\[",
        e: "\\]\\]>",
        r: 10
      }, {
        cN: "tag",
        b: "<style(?=\\s|>|$)",
        e: ">",
        k: {
          title: "style"
        },
        c: [b],
        starts: {
          e: "</style>",
          rE: true,
          sL: "css"
        }
      }, {
        cN: "tag",
        b: "<script(?=\\s|>|$)",
        e: ">",
        k: {
          title: "script"
        },
        c: [b],
        starts: {
          e: "<\/script>",
          rE: true,
          sL: "javascript"
        }
      }, {
        b: "<%",
        e: "%>",
        sL: "vbscript"
      },
      d, {
        cN: "pi",
        b: /<\?\w+/,
        e: /\?>/,
        r: 10
      }, {
        cN: "tag",
        b: "</?",
        e: "/?>",
        c: [{
            cN: "title",
            b: "[^ /><]+",
            r: 0
          },
          b
        ]
      }
    ]
  }
});
hljs.registerLanguage("django", function(a) {
  var b = {
    cN: "filter",
    b: /\|[A-Za-z]+\:?/,
    k: "truncatewords removetags linebreaksbr yesno get_digit timesince random striptags filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort dictsortreversed default_if_none pluralize lower join center default truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize localtime utc timezone",
    c: [{
      cN: "argument",
      b: /"/,
      e: /"/
    }, {
      cN: "argument",
      b: /'/,
      e: /'/
    }]
  };
  return {
    cI: true,
    sL: "xml",
    subLanguageMode: "continuous",
    c: [{
      cN: "template_comment",
      b: /\{%\s*comment\s*%}/,
      e: /\{%\s*endcomment\s*%}/
    }, {
      cN: "template_comment",
      b: /\{#/,
      e: /#}/
    }, {
      cN: "template_tag",
      b: /\{%/,
      e: /%}/,
      k: "comment endcomment load templatetag ifchanged endifchanged if endif firstof for endfor in ifnotequal endifnotequal widthratio extends include spaceless endspaceless regroup by as ifequal endifequal ssi now with cycle url filter endfilter debug block endblock else autoescape endautoescape csrf_token empty elif endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix plural get_current_language language get_available_languages get_current_language_bidi get_language_info get_language_info_list localize endlocalize localtime endlocaltime timezone endtimezone get_current_timezone verbatim",
      c: [b]
    }, {
      cN: "variable",
      b: /\{\{/,
      e: /}}/,
      c: [b]
    }]
  }
});
hljs.registerLanguage("bash", function(b) {
  var a = {
    cN: "variable",
    v: [{
      b: /\$[\w\d#@][\w\d_]*/
    }, {
      b: /\$\{(.*?)\}/
    }]
  };
  var d = {
    cN: "string",
    b: /"/,
    e: /"/,
    c: [b.BE, a, {
      cN: "variable",
      b: /\$\(/,
      e: /\)/,
      c: [b.BE]
    }]
  };
  var c = {
    cN: "string",
    b: /'/,
    e: /'/
  };
  return {
    l: /-?[a-z\.]+/,
    k: {
      keyword: "if then else elif fi for break continue while in do done exit return set declare case esac export exec",
      literal: "true false",
      built_in: "printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo",
      operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
    },
    c: [{
        cN: "shebang",
        b: /^#![^\n]+sh\s*$/,
        r: 10
      }, {
        cN: "function",
        b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
        rB: true,
        c: [b.inherit(b.TM, {
          b: /\w[\w\d_]*/
        })],
        r: 0
      },
      b.HCM, b.NM, d, c, a
    ]
  }
});
hljs.registerLanguage("ini", function(a) {
  return {
    cI: true,
    i: /\S/,
    c: [{
      cN: "comment",
      b: ";",
      e: "$"
    }, {
      cN: "title",
      b: "^\\[",
      e: "\\]"
    }, {
      cN: "setting",
      b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",
      e: "$",
      c: [{
        cN: "value",
        eW: true,
        k: "on off true false yes no",
        c: [a.QSM, a.NM],
        r: 0
      }]
    }]
  }
});
hljs.registerLanguage("objectivec", function(a) {
  var d = {
    keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign self synchronized id nonatomic super unichar IBOutlet IBAction strong weak @private @protected @public @try @property @end @throw @catch @finally @synthesize @dynamic @selector @optional @required",
    literal: "false true FALSE TRUE nil YES NO NULL",
    built_in: "NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection UIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
  };
  var c = /[a-zA-Z@][a-zA-Z0-9_]*/;
  var b = "@interface @class @protocol @implementation";
  return {
    k: d,
    l: c,
    i: "</",
    c: [a.CLCM, a.CBLCLM, a.CNM, a.QSM, {
      cN: "string",
      b: "'",
      e: "[^\\\\]'",
      i: "[^\\\\][^']"
    }, {
      cN: "preprocessor",
      b: "#import",
      e: "$",
      c: [{
        cN: "title",
        b: '"',
        e: '"'
      }, {
        cN: "title",
        b: "<",
        e: ">"
      }]
    }, {
      cN: "preprocessor",
      b: "#",
      e: "$"
    }, {
      cN: "class",
      b: "(" + b.split(" ").join("|") + ")\\b",
      e: "({|$)",
      k: b,
      l: c,
      c: [a.UTM]
    }, {
      cN: "variable",
      b: "\\." + a.UIR,
      r: 0
    }]
  }
});
hljs.registerLanguage("scss", function(a) {
  var c = "[a-zA-Z-][a-zA-Z0-9_-]*";
  var d = {
    cN: "function",
    b: c + "\\(",
    e: "\\)",
    c: ["self", a.NM, a.ASM, a.QSM]
  };
  var b = {
    cN: "hexcolor",
    b: "#[0-9A-Fa-f]+"
  };
  var e = {
    cN: "attribute",
    b: "[A-Z\\_\\.\\-]+",
    e: ":",
    eE: true,
    i: "[^\\s]",
    starts: {
      cN: "value",
      eW: true,
      eE: true,
      c: [d, b, a.NM, a.QSM, a.ASM, a.CBLCLM, {
        cN: "important",
        b: "!important"
      }]
    }
  };
  return {
    cI: true,
    i: "[=/|']",
    c: [a.CLCM, a.CBLCLM, {
      cN: "function",
      b: c + "\\(",
      e: "\\)",
      c: ["self", a.NM, a.ASM, a.QSM]
    }, {
      cN: "id",
      b: "\\#[A-Za-z0-9_-]+",
      r: 0
    }, {
      cN: "class",
      b: "\\.[A-Za-z0-9_-]+",
      r: 0
    }, {
      cN: "attr_selector",
      b: "\\[",
      e: "\\]",
      i: "$"
    }, {
      cN: "tag",
      b: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
      r: 0
    }, {
      cN: "pseudo",
      b: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
    }, {
      cN: "pseudo",
      b: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
    }, {
      cN: "attribute",
      b: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
      i: "[^\\s]"
    }, {
      cN: "value",
      b: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
    }, {
      cN: "value",
      b: ":",
      e: ";",
      c: [b, a.NM, a.QSM, a.ASM, {
        cN: "important",
        b: "!important"
      }]
    }, {
      cN: "at_rule",
      b: "@",
      e: "[{;]",
      k: "mixin include extend for if else each while charset import debug media page content font-face namespace warn",
      c: [d, a.QSM, a.ASM, b, a.NM, {
        cN: "preprocessor",
        b: "\\s[A-Za-z0-9_.-]+",
        r: 0
      }]
    }]
  }
});
hljs.registerLanguage("python", function(a) {
  var f = {
    cN: "prompt",
    b: /^(>>>|\.\.\.) /
  };
  var b = {
    cN: "string",
    c: [a.BE],
    v: [{
        b: /(u|b)?r?'''/,
        e: /'''/,
        c: [f],
        r: 10
      }, {
        b: /(u|b)?r?"""/,
        e: /"""/,
        c: [f],
        r: 10
      }, {
        b: /(u|r|ur)'/,
        e: /'/,
        r: 10
      }, {
        b: /(u|r|ur)"/,
        e: /"/,
        r: 10
      }, {
        b: /(b|br)'/,
        e: /'/,
      }, {
        b: /(b|br)"/,
        e: /"/,
      },
      a.ASM, a.QSM
    ]
  };
  var d = {
    cN: "number",
    r: 0,
    v: [{
      b: a.BNR + "[lLjJ]?"
    }, {
      b: "\\b(0o[0-7]+)[lLjJ]?"
    }, {
      b: a.CNR + "[lLjJ]?"
    }]
  };
  var e = {
    cN: "params",
    b: /\(/,
    e: /\)/,
    c: ["self", f, d, b]
  };
  var c = {
    e: /:/,
    i: /[${=;\n]/,
    c: [a.UTM, e]
  };
  return {
    k: {
      keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",
      built_in: "Ellipsis NotImplemented"
    },
    i: /(<\/|->|\?)/,
    c: [f, d, b, a.HCM, a.inherit(c, {
      cN: "function",
      bK: "def",
      r: 10
    }), a.inherit(c, {
      cN: "class",
      bK: "class"
    }), {
      cN: "decorator",
      b: /@/,
      e: /$/
    }, {
      b: /\b(print|exec)\(/
    }]
  }
});
hljs.registerLanguage("mel", function(a) {
  return {
    k: "int float string vector matrix if else switch case default while do for in break continue global proc return about abs addAttr addAttributeEditorNodeHelp addDynamic addNewShelfTab addPP addPanelCategory addPrefixToName advanceToNextDrivenKey affectedNet affects aimConstraint air alias aliasAttr align alignCtx alignCurve alignSurface allViewFit ambientLight angle angleBetween animCone animCurveEditor animDisplay animView annotate appendStringArray applicationName applyAttrPreset applyTake arcLenDimContext arcLengthDimension arclen arrayMapper art3dPaintCtx artAttrCtx artAttrPaintVertexCtx artAttrSkinPaintCtx artAttrTool artBuildPaintMenu artFluidAttrCtx artPuttyCtx artSelectCtx artSetPaintCtx artUserPaintCtx assignCommand assignInputDevice assignViewportFactories attachCurve attachDeviceAttr attachSurface attrColorSliderGrp attrCompatibility attrControlGrp attrEnumOptionMenu attrEnumOptionMenuGrp attrFieldGrp attrFieldSliderGrp attrNavigationControlGrp attrPresetEditWin attributeExists attributeInfo attributeMenu attributeQuery autoKeyframe autoPlace bakeClip bakeFluidShading bakePartialHistory bakeResults bakeSimulation basename basenameEx batchRender bessel bevel bevelPlus binMembership bindSkin blend2 blendShape blendShapeEditor blendShapePanel blendTwoAttr blindDataType boneLattice boundary boxDollyCtx boxZoomCtx bufferCurve buildBookmarkMenu buildKeyframeMenu button buttonManip CBG cacheFile cacheFileCombine cacheFileMerge cacheFileTrack camera cameraView canCreateManip canvas capitalizeString catch catchQuiet ceil changeSubdivComponentDisplayLevel changeSubdivRegion channelBox character characterMap characterOutlineEditor characterize chdir checkBox checkBoxGrp checkDefaultRenderGlobals choice circle circularFillet clamp clear clearCache clip clipEditor clipEditorCurrentTimeCtx clipSchedule clipSchedulerOutliner clipTrimBefore closeCurve closeSurface cluster cmdFileOutput cmdScrollFieldExecuter cmdScrollFieldReporter cmdShell coarsenSubdivSelectionList collision color colorAtPoint colorEditor colorIndex colorIndexSliderGrp colorSliderButtonGrp colorSliderGrp columnLayout commandEcho commandLine commandPort compactHairSystem componentEditor compositingInterop computePolysetVolume condition cone confirmDialog connectAttr connectControl connectDynamic connectJoint connectionInfo constrain constrainValue constructionHistory container containsMultibyte contextInfo control convertFromOldLayers convertIffToPsd convertLightmap convertSolidTx convertTessellation convertUnit copyArray copyFlexor copyKey copySkinWeights cos cpButton cpCache cpClothSet cpCollision cpConstraint cpConvClothToMesh cpForces cpGetSolverAttr cpPanel cpProperty cpRigidCollisionFilter cpSeam cpSetEdit cpSetSolverAttr cpSolver cpSolverTypes cpTool cpUpdateClothUVs createDisplayLayer createDrawCtx createEditor createLayeredPsdFile createMotionField createNewShelf createNode createRenderLayer createSubdivRegion cross crossProduct ctxAbort ctxCompletion ctxEditMode ctxTraverse currentCtx currentTime currentTimeCtx currentUnit curve curveAddPtCtx curveCVCtx curveEPCtx curveEditorCtx curveIntersect curveMoveEPCtx curveOnSurface curveSketchCtx cutKey cycleCheck cylinder dagPose date defaultLightListCheckBox defaultNavigation defineDataServer defineVirtualDevice deformer deg_to_rad delete deleteAttr deleteShadingGroupsAndMaterials deleteShelfTab deleteUI deleteUnusedBrushes delrandstr detachCurve detachDeviceAttr detachSurface deviceEditor devicePanel dgInfo dgdirty dgeval dgtimer dimWhen directKeyCtx directionalLight dirmap dirname disable disconnectAttr disconnectJoint diskCache displacementToPoly displayAffected displayColor displayCull displayLevelOfDetail displayPref displayRGBColor displaySmoothness displayStats displayString displaySurface distanceDimContext distanceDimension doBlur dolly dollyCtx dopeSheetEditor dot dotProduct doubleProfileBirailSurface drag dragAttrContext draggerContext dropoffLocator duplicate duplicateCurve duplicateSurface dynCache dynControl dynExport dynExpression dynGlobals dynPaintEditor dynParticleCtx dynPref dynRelEdPanel dynRelEditor dynamicLoad editAttrLimits editDisplayLayerGlobals editDisplayLayerMembers editRenderLayerAdjustment editRenderLayerGlobals editRenderLayerMembers editor editorTemplate effector emit emitter enableDevice encodeString endString endsWith env equivalent equivalentTol erf error eval evalDeferred evalEcho event exactWorldBoundingBox exclusiveLightCheckBox exec executeForEachObject exists exp expression expressionEditorListen extendCurve extendSurface extrude fcheck fclose feof fflush fgetline fgetword file fileBrowserDialog fileDialog fileExtension fileInfo filetest filletCurve filter filterCurve filterExpand filterStudioImport findAllIntersections findAnimCurves findKeyframe findMenuItem findRelatedSkinCluster finder firstParentOf fitBspline flexor floatEq floatField floatFieldGrp floatScrollBar floatSlider floatSlider2 floatSliderButtonGrp floatSliderGrp floor flow fluidCacheInfo fluidEmitter fluidVoxelInfo flushUndo fmod fontDialog fopen formLayout format fprint frameLayout fread freeFormFillet frewind fromNativePath fwrite gamma gauss geometryConstraint getApplicationVersionAsFloat getAttr getClassification getDefaultBrush getFileList getFluidAttr getInputDeviceRange getMayaPanelTypes getModifiers getPanel getParticleAttr getPluginResource getenv getpid glRender glRenderEditor globalStitch gmatch goal gotoBindPose grabColor gradientControl gradientControlNoAttr graphDollyCtx graphSelectContext graphTrackCtx gravity grid gridLayout group groupObjectsByName HfAddAttractorToAS HfAssignAS HfBuildEqualMap HfBuildFurFiles HfBuildFurImages HfCancelAFR HfConnectASToHF HfCreateAttractor HfDeleteAS HfEditAS HfPerformCreateAS HfRemoveAttractorFromAS HfSelectAttached HfSelectAttractors HfUnAssignAS hardenPointCurve hardware hardwareRenderPanel headsUpDisplay headsUpMessage help helpLine hermite hide hilite hitTest hotBox hotkey hotkeyCheck hsv_to_rgb hudButton hudSlider hudSliderButton hwReflectionMap hwRender hwRenderLoad hyperGraph hyperPanel hyperShade hypot iconTextButton iconTextCheckBox iconTextRadioButton iconTextRadioCollection iconTextScrollList iconTextStaticLabel ikHandle ikHandleCtx ikHandleDisplayScale ikSolver ikSplineHandleCtx ikSystem ikSystemInfo ikfkDisplayMethod illustratorCurves image imfPlugins inheritTransform insertJoint insertJointCtx insertKeyCtx insertKnotCurve insertKnotSurface instance instanceable instancer intField intFieldGrp intScrollBar intSlider intSliderGrp interToUI internalVar intersect iprEngine isAnimCurve isConnected isDirty isParentOf isSameObject isTrue isValidObjectName isValidString isValidUiName isolateSelect itemFilter itemFilterAttr itemFilterRender itemFilterType joint jointCluster jointCtx jointDisplayScale jointLattice keyTangent keyframe keyframeOutliner keyframeRegionCurrentTimeCtx keyframeRegionDirectKeyCtx keyframeRegionDollyCtx keyframeRegionInsertKeyCtx keyframeRegionMoveKeyCtx keyframeRegionScaleKeyCtx keyframeRegionSelectKeyCtx keyframeRegionSetKeyCtx keyframeRegionTrackCtx keyframeStats lassoContext lattice latticeDeformKeyCtx launch launchImageEditor layerButton layeredShaderPort layeredTexturePort layout layoutDialog lightList lightListEditor lightListPanel lightlink lineIntersection linearPrecision linstep listAnimatable listAttr listCameras listConnections listDeviceAttachments listHistory listInputDeviceAxes listInputDeviceButtons listInputDevices listMenuAnnotation listNodeTypes listPanelCategories listRelatives listSets listTransforms listUnselected listerEditor loadFluid loadNewShelf loadPlugin loadPluginLanguageResources loadPrefObjects localizedPanelLabel lockNode loft log longNameOf lookThru ls lsThroughFilter lsType lsUI Mayatomr mag makeIdentity makeLive makePaintable makeRoll makeSingleSurface makeTubeOn makebot manipMoveContext manipMoveLimitsCtx manipOptions manipRotateContext manipRotateLimitsCtx manipScaleContext manipScaleLimitsCtx marker match max memory menu menuBarLayout menuEditor menuItem menuItemToShelf menuSet menuSetPref messageLine min minimizeApp mirrorJoint modelCurrentTimeCtx modelEditor modelPanel mouse movIn movOut move moveIKtoFK moveKeyCtx moveVertexAlongDirection multiProfileBirailSurface mute nParticle nameCommand nameField namespace namespaceInfo newPanelItems newton nodeCast nodeIconButton nodeOutliner nodePreset nodeType noise nonLinear normalConstraint normalize nurbsBoolean nurbsCopyUVSet nurbsCube nurbsEditUV nurbsPlane nurbsSelect nurbsSquare nurbsToPoly nurbsToPolygonsPref nurbsToSubdiv nurbsToSubdivPref nurbsUVSet nurbsViewDirectionVector objExists objectCenter objectLayer objectType objectTypeUI obsoleteProc oceanNurbsPreviewPlane offsetCurve offsetCurveOnSurface offsetSurface openGLExtension openMayaPref optionMenu optionMenuGrp optionVar orbit orbitCtx orientConstraint outlinerEditor outlinerPanel overrideModifier paintEffectsDisplay pairBlend palettePort paneLayout panel panelConfiguration panelHistory paramDimContext paramDimension paramLocator parent parentConstraint particle particleExists particleInstancer particleRenderInfo partition pasteKey pathAnimation pause pclose percent performanceOptions pfxstrokes pickWalk picture pixelMove planarSrf plane play playbackOptions playblast plugAttr plugNode pluginInfo pluginResourceUtil pointConstraint pointCurveConstraint pointLight pointMatrixMult pointOnCurve pointOnSurface pointPosition poleVectorConstraint polyAppend polyAppendFacetCtx polyAppendVertex polyAutoProjection polyAverageNormal polyAverageVertex polyBevel polyBlendColor polyBlindData polyBoolOp polyBridgeEdge polyCacheMonitor polyCheck polyChipOff polyClipboard polyCloseBorder polyCollapseEdge polyCollapseFacet polyColorBlindData polyColorDel polyColorPerVertex polyColorSet polyCompare polyCone polyCopyUV polyCrease polyCreaseCtx polyCreateFacet polyCreateFacetCtx polyCube polyCut polyCutCtx polyCylinder polyCylindricalProjection polyDelEdge polyDelFacet polyDelVertex polyDuplicateAndConnect polyDuplicateEdge polyEditUV polyEditUVShell polyEvaluate polyExtrudeEdge polyExtrudeFacet polyExtrudeVertex polyFlipEdge polyFlipUV polyForceUV polyGeoSampler polyHelix polyInfo polyInstallAction polyLayoutUV polyListComponentConversion polyMapCut polyMapDel polyMapSew polyMapSewMove polyMergeEdge polyMergeEdgeCtx polyMergeFacet polyMergeFacetCtx polyMergeUV polyMergeVertex polyMirrorFace polyMoveEdge polyMoveFacet polyMoveFacetUV polyMoveUV polyMoveVertex polyNormal polyNormalPerVertex polyNormalizeUV polyOptUvs polyOptions polyOutput polyPipe polyPlanarProjection polyPlane polyPlatonicSolid polyPoke polyPrimitive polyPrism polyProjection polyPyramid polyQuad polyQueryBlindData polyReduce polySelect polySelectConstraint polySelectConstraintMonitor polySelectCtx polySelectEditCtx polySeparate polySetToFaceNormal polySewEdge polyShortestPathCtx polySmooth polySoftEdge polySphere polySphericalProjection polySplit polySplitCtx polySplitEdge polySplitRing polySplitVertex polyStraightenUVBorder polySubdivideEdge polySubdivideFacet polyToSubdiv polyTorus polyTransfer polyTriangulate polyUVSet polyUnite polyWedgeFace popen popupMenu pose pow preloadRefEd print progressBar progressWindow projFileViewer projectCurve projectTangent projectionContext projectionManip promptDialog propModCtx propMove psdChannelOutliner psdEditTextureFile psdExport psdTextureFile putenv pwd python querySubdiv quit rad_to_deg radial radioButton radioButtonGrp radioCollection radioMenuItemCollection rampColorPort rand randomizeFollicles randstate rangeControl readTake rebuildCurve rebuildSurface recordAttr recordDevice redo reference referenceEdit referenceQuery refineSubdivSelectionList refresh refreshAE registerPluginResource rehash reloadImage removeJoint removeMultiInstance removePanelCategory rename renameAttr renameSelectionList renameUI render renderGlobalsNode renderInfo renderLayerButton renderLayerParent renderLayerPostProcess renderLayerUnparent renderManip renderPartition renderQualityNode renderSettings renderThumbnailUpdate renderWindowEditor renderWindowSelectContext renderer reorder reorderDeformers requires reroot resampleFluid resetAE resetPfxToPolyCamera resetTool resolutionNode retarget reverseCurve reverseSurface revolve rgb_to_hsv rigidBody rigidSolver roll rollCtx rootOf rot rotate rotationInterpolation roundConstantRadius rowColumnLayout rowLayout runTimeCommand runup sampleImage saveAllShelves saveAttrPreset saveFluid saveImage saveInitialState saveMenu savePrefObjects savePrefs saveShelf saveToolSettings scale scaleBrushBrightness scaleComponents scaleConstraint scaleKey scaleKeyCtx sceneEditor sceneUIReplacement scmh scriptCtx scriptEditorInfo scriptJob scriptNode scriptTable scriptToShelf scriptedPanel scriptedPanelType scrollField scrollLayout sculpt searchPathArray seed selLoadSettings select selectContext selectCurveCV selectKey selectKeyCtx selectKeyframeRegionCtx selectMode selectPref selectPriority selectType selectedNodes selectionConnection separator setAttr setAttrEnumResource setAttrMapping setAttrNiceNameResource setConstraintRestPosition setDefaultShadingGroup setDrivenKeyframe setDynamic setEditCtx setEditor setFluidAttr setFocus setInfinity setInputDeviceMapping setKeyCtx setKeyPath setKeyframe setKeyframeBlendshapeTargetWts setMenuMode setNodeNiceNameResource setNodeTypeFlag setParent setParticleAttr setPfxToPolyCamera setPluginResource setProject setStampDensity setStartupMessage setState setToolTo setUITemplate setXformManip sets shadingConnection shadingGeometryRelCtx shadingLightRelCtx shadingNetworkCompare shadingNode shapeCompare shelfButton shelfLayout shelfTabLayout shellField shortNameOf showHelp showHidden showManipCtx showSelectionInTitle showShadingGroupAttrEditor showWindow sign simplify sin singleProfileBirailSurface size sizeBytes skinCluster skinPercent smoothCurve smoothTangentSurface smoothstep snap2to2 snapKey snapMode snapTogetherCtx snapshot soft softMod softModCtx sort sound soundControl source spaceLocator sphere sphrand spotLight spotLightPreviewPort spreadSheetEditor spring sqrt squareSurface srtContext stackTrace startString startsWith stitchAndExplodeShell stitchSurface stitchSurfacePoints strcmp stringArrayCatenate stringArrayContains stringArrayCount stringArrayInsertAtIndex stringArrayIntersector stringArrayRemove stringArrayRemoveAtIndex stringArrayRemoveDuplicates stringArrayRemoveExact stringArrayToString stringToStringArray strip stripPrefixFromName stroke subdAutoProjection subdCleanTopology subdCollapse subdDuplicateAndConnect subdEditUV subdListComponentConversion subdMapCut subdMapSewMove subdMatchTopology subdMirror subdToBlind subdToPoly subdTransferUVsToCache subdiv subdivCrease subdivDisplaySmoothness substitute substituteAllString substituteGeometry substring surface surfaceSampler surfaceShaderList swatchDisplayPort switchTable symbolButton symbolCheckBox sysFile system tabLayout tan tangentConstraint texLatticeDeformContext texManipContext texMoveContext texMoveUVShellContext texRotateContext texScaleContext texSelectContext texSelectShortestPathCtx texSmudgeUVContext texWinToolCtx text textCurves textField textFieldButtonGrp textFieldGrp textManip textScrollList textToShelf textureDisplacePlane textureHairColor texturePlacementContext textureWindow threadCount threePointArcCtx timeControl timePort timerX toNativePath toggle toggleAxis toggleWindowVisibility tokenize tokenizeList tolerance tolower toolButton toolCollection toolDropped toolHasOptions toolPropertyWindow torus toupper trace track trackCtx transferAttributes transformCompare transformLimits translator trim trunc truncateFluidCache truncateHairCache tumble tumbleCtx turbulence twoPointArcCtx uiRes uiTemplate unassignInputDevice undo undoInfo ungroup uniform unit unloadPlugin untangleUV untitledFileName untrim upAxis updateAE userCtx uvLink uvSnapshot validateShelfName vectorize view2dToolCtx viewCamera viewClipPlane viewFit viewHeadOn viewLookAt viewManip viewPlace viewSet visor volumeAxis vortex waitCursor warning webBrowser webBrowserPrefs whatIs window windowPref wire wireContext workspace wrinkle wrinkleContext writeTake xbmLangPathList xform",
    i: "</",
    c: [a.CNM, a.ASM, a.QSM, {
        cN: "string",
        b: "`",
        e: "`",
        c: [a.BE]
      }, {
        cN: "variable",
        v: [{
          b: "\\$\\d"
        }, {
          b: "[\\$\\%\\@](\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)"
        }, {
          b: "\\*(\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)",
          r: 0
        }]
      },
      a.CLCM, a.CBLCLM
    ]
  }
});
hljs.registerLanguage("dos", function(a) {
  return {
    cI: true,
    k: {
      flow: "if else goto for in do call exit not exist errorlevel defined equ neq lss leq gtr geq",
      keyword: "shift cd dir echo setlocal endlocal set pause copy",
      stream: "prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux",
      winutils: "ping net ipconfig taskkill xcopy ren del"
    },
    c: [{
      cN: "envvar",
      b: "%%[^ ]"
    }, {
      cN: "envvar",
      b: "%[^ ]+?%"
    }, {
      cN: "envvar",
      b: "![^ ]+?!"
    }, {
      cN: "number",
      b: "\\b\\d+",
      r: 0
    }, {
      cN: "comment",
      b: "@?rem",
      e: "$"
    }]
  }
});
hljs.registerLanguage("java", function(b) {
  var a = "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws";
  return {
    k: a,
    i: /<\//,
    c: [{
        cN: "javadoc",
        b: "/\\*\\*",
        e: "\\*/",
        c: [{
          cN: "javadoctag",
          b: "(^|\\s)@[A-Za-z]+"
        }],
        r: 10
      },
      b.CLCM, b.CBLCLM, b.ASM, b.QSM, {
        bK: "protected public private",
        e: /[{;=]/,
        k: a,
        c: [{
          cN: "class",
          bK: "class interface",
          eW: true,
          i: /[:"<>]/,
          c: [{
              bK: "extends implements",
              r: 10
            },
            b.UTM
          ]
        }, {
          b: b.UIR + "\\s*\\(",
          rB: true,
          c: [b.UTM]
        }]
      },
      b.CNM, {
        cN: "annotation",
        b: "@[A-Za-z]+"
      }
    ]
  }
});
hljs.registerLanguage("tex", function(a) {
  var d = {
    cN: "command",
    b: "\\\\[a-zA-Zа-яА-я]+[\\*]?"
  };
  var c = {
    cN: "command",
    b: "\\\\[^a-zA-Zа-яА-я0-9]"
  };
  var b = {
    cN: "special",
    b: "[{}\\[\\]\\&#~]",
    r: 0
  };
  return {
    c: [{
        b: "\\\\[a-zA-Zа-яА-я]+[\\*]? *= *-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
        rB: true,
        c: [d, c, {
          cN: "number",
          b: " *=",
          e: "-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
          eB: true
        }],
        r: 10
      },
      d, c, b, {
        cN: "formula",
        b: "\\$\\$",
        e: "\\$\\$",
        c: [d, c, b],
        r: 0
      }, {
        cN: "formula",
        b: "\\$",
        e: "\\$",
        c: [d, c, b],
        r: 0
      }, {
        cN: "comment",
        b: "%",
        e: "$",
        r: 0
      }
    ]
  }
});
hljs.registerLanguage("glsl", function(a) {
  return {
    k: {
      keyword: "atomic_uint attribute bool break bvec2 bvec3 bvec4 case centroid coherent const continue default discard dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 dmat3x4 dmat4 dmat4x2 dmat4x3 dmat4x4 do double dvec2 dvec3 dvec4 else flat float for highp if iimage1D iimage1DArray iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBuffer iimageCube iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray image2DRect image3D imageBuffer imageCube imageCubeArray in inout int invariant isampler1D isampler1DArray isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D isamplerBuffer isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 layout lowp mat2 mat2x2 mat2x3 mat2x4 mat3 mat3x2 mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 mediump noperspective out patch precision readonly restrict return sample sampler1D sampler1DArray sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray sampler2DArrayShadow sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow sampler3D samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow smooth struct subroutine switch uimage1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray uimage2DRect uimage3D uimageBuffer uimageCube uimageCubeArray uint uniform usampler1D usampler1DArray usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D usamplerBuffer usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 varying vec2 vec3 vec4 void volatile while writeonly",
      built_in: "gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial gl_FrontSecondaryColor gl_InstanceID gl_InvocationID gl_Layer gl_LightModel gl_LightSource gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize gl_MaxClipDistances gl_MaxClipPlanes gl_MaxCombinedAtomicCounterBuffers gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms gl_MaxCombinedImageUnitsAndFragmentOutputs gl_MaxCombinedTextureImageUnits gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers gl_MaxFragmentAtomicCounters gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs gl_MaxVertexImageUniforms gl_MaxVertexOutputComponents gl_MaxVertexTextureImageUnits gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffsetgl_ModelViewMatrix gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose gl_ModelViewMatrixTranspose gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse gl_ModelViewProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixTranspose gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_Normal gl_NormalMatrix gl_NormalScale gl_ObjectPlaneQ gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn gl_PerVertex gl_Point gl_PointCoord gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn gl_ProjectionMatrix gl_ProjectionMatrixInverse gl_ProjectionMatrixInverseTranspose gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask gl_SampleMaskIn gl_SamplePosition gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter gl_TexCoord gl_TextureEnvColor gl_TextureMatrixInverseTranspose gl_TextureMatrixTranspose gl_Vertex gl_VertexID gl_ViewportIndex gl_in gl_out EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive abs acos acosh all any asin asinh atan atanh atomicCounter atomicCounterDecrement atomicCounterIncrement barrier bitCount bitfieldExtract bitfieldInsert bitfieldReverse ceil clamp cos cosh cross dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward findLSB findMSB floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan greaterThanEqual imageAtomicAdd imageAtomicAnd imageAtomicCompSwap imageAtomicExchange imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad imageStore imulExtended intBitsToFloat interpolateAtCentroid interpolateAtOffset interpolateAtSample inverse inversesqrt isinf isnan ldexp length lessThan lessThanEqual log log2 matrixCompMult max memoryBarrier min mix mod modf noise1 noise2 noise3 noise4 normalize not notEqual outerProduct packDouble2x32 packHalf2x16 packSnorm2x16 packSnorm4x8 packUnorm2x16 packUnorm4x8 pow radians reflect refract round roundEven shadow1D shadow1DLod shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj shadow2DProjLod sign sin sinh smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture texture1D texture1DLod texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj texture2DProjLod texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset textureLod textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset textureProjLod textureProjLodOffset textureProjOffset textureQueryLod textureSize transpose trunc uaddCarry uintBitsToFloat umulExtended unpackDouble2x32 unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 unpackUnorm2x16 unpackUnorm4x8 usubBorrow gl_TextureMatrix gl_TextureMatrixInverse",
      literal: "true false"
    },
    i: '"',
    c: [a.CLCM, a.CBLCLM, a.CNM, {
      cN: "preprocessor",
      b: "#",
      e: "$"
    }]
  }
});
hljs.registerLanguage("brainfuck", function(b) {
  var a = {
    cN: "literal",
    b: "[\\+\\-]",
    r: 0
  };
  return {
    c: [{
        cN: "comment",
        b: "[^\\[\\]\\.,\\+\\-<> \r\n]",
        rE: true,
        e: "[\\[\\]\\.,\\+\\-<> \r\n]",
        r: 0
      }, {
        cN: "title",
        b: "[\\[\\]]",
        r: 0
      }, {
        cN: "string",
        b: "[\\.,]",
        r: 0
      }, {
        b: /\+\+|\-\-/,
        rB: true,
        c: [a]
      },
      a
    ]
  }
});
hljs.registerLanguage("mathematica", function(a) {
  return {
    aliases: ["mma"],
    l: "(\\$|\\b)" + a.IR + "\\b",
    k: "AbelianGroup Abort AbortKernels AbortProtect Above Abs Absolute AbsoluteCorrelation AbsoluteCorrelationFunction AbsoluteCurrentValue AbsoluteDashing AbsoluteFileName AbsoluteOptions AbsolutePointSize AbsoluteThickness AbsoluteTime AbsoluteTiming AccountingForm Accumulate Accuracy AccuracyGoal ActionDelay ActionMenu ActionMenuBox ActionMenuBoxOptions Active ActiveItem ActiveStyle AcyclicGraphQ AddOnHelpPath AddTo AdjacencyGraph AdjacencyList AdjacencyMatrix AdjustmentBox AdjustmentBoxOptions AdjustTimeSeriesForecast AffineTransform After AiryAi AiryAiPrime AiryAiZero AiryBi AiryBiPrime AiryBiZero AlgebraicIntegerQ AlgebraicNumber AlgebraicNumberDenominator AlgebraicNumberNorm AlgebraicNumberPolynomial AlgebraicNumberTrace AlgebraicRules AlgebraicRulesData Algebraics AlgebraicUnitQ Alignment AlignmentMarker AlignmentPoint All AllowedDimensions AllowGroupClose AllowInlineCells AllowKernelInitialization AllowReverseGroupClose AllowScriptLevelChange AlphaChannel AlternatingGroup AlternativeHypothesis Alternatives AmbientLight Analytic AnchoredSearch And AndersonDarlingTest AngerJ AngleBracket AngularGauge Animate AnimationCycleOffset AnimationCycleRepetitions AnimationDirection AnimationDisplayTime AnimationRate AnimationRepetitions AnimationRunning Animator AnimatorBox AnimatorBoxOptions AnimatorElements Annotation Annuity AnnuityDue Antialiasing Antisymmetric Apart ApartSquareFree Appearance AppearanceElements AppellF1 Append AppendTo Apply ArcCos ArcCosh ArcCot ArcCoth ArcCsc ArcCsch ArcSec ArcSech ArcSin ArcSinDistribution ArcSinh ArcTan ArcTanh Arg ArgMax ArgMin ArgumentCountQ ARIMAProcess ArithmeticGeometricMean ARMAProcess ARProcess Array ArrayComponents ArrayDepth ArrayFlatten ArrayPad ArrayPlot ArrayQ ArrayReshape ArrayRules Arrays Arrow Arrow3DBox ArrowBox Arrowheads AspectRatio AspectRatioFixed Assert Assuming Assumptions AstronomicalData Asynchronous AsynchronousTaskObject AsynchronousTasks AtomQ Attributes AugmentedSymmetricPolynomial AutoAction AutoDelete AutoEvaluateEvents AutoGeneratedPackage AutoIndent AutoIndentSpacings AutoItalicWords AutoloadPath AutoMatch Automatic AutomaticImageSize AutoMultiplicationSymbol AutoNumberFormatting AutoOpenNotebooks AutoOpenPalettes AutorunSequencing AutoScaling AutoScroll AutoSpacing AutoStyleOptions AutoStyleWords Axes AxesEdge AxesLabel AxesOrigin AxesStyle Axis BabyMonsterGroupB Back Background BackgroundTasksSettings Backslash Backsubstitution Backward Band BandpassFilter BandstopFilter BarabasiAlbertGraphDistribution BarChart BarChart3D BarLegend BarlowProschanImportance BarnesG BarOrigin BarSpacing BartlettHannWindow BartlettWindow BaseForm Baseline BaselinePosition BaseStyle BatesDistribution BattleLemarieWavelet Because BeckmannDistribution Beep Before Begin BeginDialogPacket BeginFrontEndInteractionPacket BeginPackage BellB BellY Below BenfordDistribution BeniniDistribution BenktanderGibratDistribution BenktanderWeibullDistribution BernoulliB BernoulliDistribution BernoulliGraphDistribution BernoulliProcess BernsteinBasis BesselFilterModel BesselI BesselJ BesselJZero BesselK BesselY BesselYZero Beta BetaBinomialDistribution BetaDistribution BetaNegativeBinomialDistribution BetaPrimeDistribution BetaRegularized BetweennessCentrality BezierCurve BezierCurve3DBox BezierCurve3DBoxOptions BezierCurveBox BezierCurveBoxOptions BezierFunction BilateralFilter Binarize BinaryFormat BinaryImageQ BinaryRead BinaryReadList BinaryWrite BinCounts BinLists Binomial BinomialDistribution BinomialProcess BinormalDistribution BiorthogonalSplineWavelet BipartiteGraphQ BirnbaumImportance BirnbaumSaundersDistribution BitAnd BitClear BitGet BitLength BitNot BitOr BitSet BitShiftLeft BitShiftRight BitXor Black BlackmanHarrisWindow BlackmanNuttallWindow BlackmanWindow Blank BlankForm BlankNullSequence BlankSequence Blend Block BlockRandom BlomqvistBeta BlomqvistBetaTest Blue Blur BodePlot BohmanWindow Bold Bookmarks Boole BooleanConsecutiveFunction BooleanConvert BooleanCountingFunction BooleanFunction BooleanGraph BooleanMaxterms BooleanMinimize BooleanMinterms Booleans BooleanTable BooleanVariables BorderDimensions BorelTannerDistribution Bottom BottomHatTransform BoundaryStyle Bounds Box BoxBaselineShift BoxData BoxDimensions Boxed Boxes BoxForm BoxFormFormatTypes BoxFrame BoxID BoxMargins BoxMatrix BoxRatios BoxRotation BoxRotationPoint BoxStyle BoxWhiskerChart Bra BracketingBar BraKet BrayCurtisDistance BreadthFirstScan Break Brown BrownForsytheTest BrownianBridgeProcess BrowserCategory BSplineBasis BSplineCurve BSplineCurve3DBox BSplineCurveBox BSplineCurveBoxOptions BSplineFunction BSplineSurface BSplineSurface3DBox BubbleChart BubbleChart3D BubbleScale BubbleSizes BulletGauge BusinessDayQ ButterflyGraph ButterworthFilterModel Button ButtonBar ButtonBox ButtonBoxOptions ButtonCell ButtonContents ButtonData ButtonEvaluator ButtonExpandable ButtonFrame ButtonFunction ButtonMargins ButtonMinHeight ButtonNote ButtonNotebook ButtonSource ButtonStyle ButtonStyleMenuListing Byte ByteCount ByteOrdering C CachedValue CacheGraphics CalendarData CalendarType CallPacket CanberraDistance Cancel CancelButton CandlestickChart Cap CapForm CapitalDifferentialD CardinalBSplineBasis CarmichaelLambda Cases Cashflow Casoratian Catalan CatalanNumber Catch CauchyDistribution CauchyWindow CayleyGraph CDF CDFDeploy CDFInformation CDFWavelet Ceiling Cell CellAutoOverwrite CellBaseline CellBoundingBox CellBracketOptions CellChangeTimes CellContents CellContext CellDingbat CellDynamicExpression CellEditDuplicate CellElementsBoundingBox CellElementSpacings CellEpilog CellEvaluationDuplicate CellEvaluationFunction CellEventActions CellFrame CellFrameColor CellFrameLabelMargins CellFrameLabels CellFrameMargins CellGroup CellGroupData CellGrouping CellGroupingRules CellHorizontalScrolling CellID CellLabel CellLabelAutoDelete CellLabelMargins CellLabelPositioning CellMargins CellObject CellOpen CellPrint CellProlog Cells CellSize CellStyle CellTags CellularAutomaton CensoredDistribution Censoring Center CenterDot CentralMoment CentralMomentGeneratingFunction CForm ChampernowneNumber ChanVeseBinarize Character CharacterEncoding CharacterEncodingsPath CharacteristicFunction CharacteristicPolynomial CharacterRange Characters ChartBaseStyle ChartElementData ChartElementDataFunction ChartElementFunction ChartElements ChartLabels ChartLayout ChartLegends ChartStyle Chebyshev1FilterModel Chebyshev2FilterModel ChebyshevDistance ChebyshevT ChebyshevU Check CheckAbort CheckAll Checkbox CheckboxBar CheckboxBox CheckboxBoxOptions ChemicalData ChessboardDistance ChiDistribution ChineseRemainder ChiSquareDistribution ChoiceButtons ChoiceDialog CholeskyDecomposition Chop Circle CircleBox CircleDot CircleMinus CirclePlus CircleTimes CirculantGraph CityData Clear ClearAll ClearAttributes ClearSystemCache ClebschGordan ClickPane Clip ClipboardNotebook ClipFill ClippingStyle ClipPlanes ClipRange Clock ClockGauge ClockwiseContourIntegral Close Closed CloseKernels ClosenessCentrality Closing ClosingAutoSave ClosingEvent ClusteringComponents CMYKColor Coarse Coefficient CoefficientArrays CoefficientDomain CoefficientList CoefficientRules CoifletWavelet Collect Colon ColonForm ColorCombine ColorConvert ColorData ColorDataFunction ColorFunction ColorFunctionScaling Colorize ColorNegate ColorOutput ColorProfileData ColorQuantize ColorReplace ColorRules ColorSelectorSettings ColorSeparate ColorSetter ColorSetterBox ColorSetterBoxOptions ColorSlider ColorSpace Column ColumnAlignments ColumnBackgrounds ColumnForm ColumnLines ColumnsEqual ColumnSpacings ColumnWidths CommonDefaultFormatTypes Commonest CommonestFilter CommonUnits CommunityBoundaryStyle CommunityGraphPlot CommunityLabels CommunityRegionStyle CompatibleUnitQ CompilationOptions CompilationTarget Compile Compiled CompiledFunction Complement CompleteGraph CompleteGraphQ CompleteKaryTree CompletionsListPacket Complex Complexes ComplexExpand ComplexInfinity ComplexityFunction ComponentMeasurements ComponentwiseContextMenu Compose ComposeList ComposeSeries Composition CompoundExpression CompoundPoissonDistribution CompoundPoissonProcess CompoundRenewalProcess Compress CompressedData Condition ConditionalExpression Conditioned Cone ConeBox ConfidenceLevel ConfidenceRange ConfidenceTransform ConfigurationPath Congruent Conjugate ConjugateTranspose Conjunction Connect ConnectedComponents ConnectedGraphQ ConnesWindow ConoverTest ConsoleMessage ConsoleMessagePacket ConsolePrint Constant ConstantArray Constants ConstrainedMax ConstrainedMin ContentPadding ContentsBoundingBox ContentSelectable ContentSize Context ContextMenu Contexts ContextToFilename ContextToFileName Continuation Continue ContinuedFraction ContinuedFractionK ContinuousAction ContinuousMarkovProcess ContinuousTimeModelQ ContinuousWaveletData ContinuousWaveletTransform ContourDetect ContourGraphics ContourIntegral ContourLabels ContourLines ContourPlot ContourPlot3D Contours ContourShading ContourSmoothing ContourStyle ContraharmonicMean Control ControlActive ControlAlignment ControllabilityGramian ControllabilityMatrix ControllableDecomposition ControllableModelQ ControllerDuration ControllerInformation ControllerInformationData ControllerLinking ControllerManipulate ControllerMethod ControllerPath ControllerState ControlPlacement ControlsRendering ControlType Convergents ConversionOptions ConversionRules ConvertToBitmapPacket ConvertToPostScript ConvertToPostScriptPacket Convolve ConwayGroupCo1 ConwayGroupCo2 ConwayGroupCo3 CoordinateChartData CoordinatesToolOptions CoordinateTransform CoordinateTransformData CoprimeQ Coproduct CopulaDistribution Copyable CopyDirectory CopyFile CopyTag CopyToClipboard CornerFilter CornerNeighbors Correlation CorrelationDistance CorrelationFunction CorrelationTest Cos Cosh CoshIntegral CosineDistance CosineWindow CosIntegral Cot Coth Count CounterAssignments CounterBox CounterBoxOptions CounterClockwiseContourIntegral CounterEvaluator CounterFunction CounterIncrements CounterStyle CounterStyleMenuListing CountRoots CountryData Covariance CovarianceEstimatorFunction CovarianceFunction CoxianDistribution CoxIngersollRossProcess CoxModel CoxModelFit CramerVonMisesTest CreateArchive CreateDialog CreateDirectory CreateDocument CreateIntermediateDirectories CreatePalette CreatePalettePacket CreateScheduledTask CreateTemporary CreateWindow CriticalityFailureImportance CriticalitySuccessImportance CriticalSection Cross CrossingDetect CrossMatrix Csc Csch CubeRoot Cubics Cuboid CuboidBox Cumulant CumulantGeneratingFunction Cup CupCap Curl CurlyDoubleQuote CurlyQuote CurrentImage CurrentlySpeakingPacket CurrentValue CurvatureFlowFilter CurveClosed Cyan CycleGraph CycleIndexPolynomial Cycles CyclicGroup Cyclotomic Cylinder CylinderBox CylindricalDecomposition D DagumDistribution DamerauLevenshteinDistance DampingFactor Darker Dashed Dashing DataCompression DataDistribution DataRange DataReversed Date DateDelimiters DateDifference DateFunction DateList DateListLogPlot DateListPlot DatePattern DatePlus DateRange DateString DateTicksFormat DaubechiesWavelet DavisDistribution DawsonF DayCount DayCountConvention DayMatchQ DayName DayPlus DayRange DayRound DeBruijnGraph Debug DebugTag Decimal DeclareKnownSymbols DeclarePackage Decompose Decrement DedekindEta Default DefaultAxesStyle DefaultBaseStyle DefaultBoxStyle DefaultButton DefaultColor DefaultControlPlacement DefaultDuplicateCellStyle DefaultDuration DefaultElement DefaultFaceGridsStyle DefaultFieldHintStyle DefaultFont DefaultFontProperties DefaultFormatType DefaultFormatTypeForStyle DefaultFrameStyle DefaultFrameTicksStyle DefaultGridLinesStyle DefaultInlineFormatType DefaultInputFormatType DefaultLabelStyle DefaultMenuStyle DefaultNaturalLanguage DefaultNewCellStyle DefaultNewInlineCellStyle DefaultNotebook DefaultOptions DefaultOutputFormatType DefaultStyle DefaultStyleDefinitions DefaultTextFormatType DefaultTextInlineFormatType DefaultTicksStyle DefaultTooltipStyle DefaultValues Defer DefineExternal DefineInputStreamMethod DefineOutputStreamMethod Definition Degree DegreeCentrality DegreeGraphDistribution DegreeLexicographic DegreeReverseLexicographic Deinitialization Del Deletable Delete DeleteBorderComponents DeleteCases DeleteContents DeleteDirectory DeleteDuplicates DeleteFile DeleteSmallComponents DeleteWithContents DeletionWarning Delimiter DelimiterFlashTime DelimiterMatching Delimiters Denominator DensityGraphics DensityHistogram DensityPlot DependentVariables Deploy Deployed Depth DepthFirstScan Derivative DerivativeFilter DescriptorStateSpace DesignMatrix Det DGaussianWavelet DiacriticalPositioning Diagonal DiagonalMatrix Dialog DialogIndent DialogInput DialogLevel DialogNotebook DialogProlog DialogReturn DialogSymbols Diamond DiamondMatrix DiceDissimilarity DictionaryLookup DifferenceDelta DifferenceOrder DifferenceRoot DifferenceRootReduce Differences DifferentialD DifferentialRoot DifferentialRootReduce DifferentiatorFilter DigitBlock DigitBlockMinimum DigitCharacter DigitCount DigitQ DihedralGroup Dilation Dimensions DiracComb DiracDelta DirectedEdge DirectedEdges DirectedGraph DirectedGraphQ DirectedInfinity Direction Directive Directory DirectoryName DirectoryQ DirectoryStack DirichletCharacter DirichletConvolve DirichletDistribution DirichletL DirichletTransform DirichletWindow DisableConsolePrintPacket DiscreteChirpZTransform DiscreteConvolve DiscreteDelta DiscreteHadamardTransform DiscreteIndicator DiscreteLQEstimatorGains DiscreteLQRegulatorGains DiscreteLyapunovSolve DiscreteMarkovProcess DiscretePlot DiscretePlot3D DiscreteRatio DiscreteRiccatiSolve DiscreteShift DiscreteTimeModelQ DiscreteUniformDistribution DiscreteVariables DiscreteWaveletData DiscreteWaveletPacketTransform DiscreteWaveletTransform Discriminant Disjunction Disk DiskBox DiskMatrix Dispatch DispersionEstimatorFunction Display DisplayAllSteps DisplayEndPacket DisplayFlushImagePacket DisplayForm DisplayFunction DisplayPacket DisplayRules DisplaySetSizePacket DisplayString DisplayTemporary DisplayWith DisplayWithRef DisplayWithVariable DistanceFunction DistanceTransform Distribute Distributed DistributedContexts DistributeDefinitions DistributionChart DistributionDomain DistributionFitTest DistributionParameterAssumptions DistributionParameterQ Dithering Div Divergence Divide DivideBy Dividers Divisible Divisors DivisorSigma DivisorSum DMSList DMSString Do DockedCells DocumentNotebook DominantColors DOSTextFormat Dot DotDashed DotEqual Dotted DoubleBracketingBar DoubleContourIntegral DoubleDownArrow DoubleLeftArrow DoubleLeftRightArrow DoubleLeftTee DoubleLongLeftArrow DoubleLongLeftRightArrow DoubleLongRightArrow DoubleRightArrow DoubleRightTee DoubleUpArrow DoubleUpDownArrow DoubleVerticalBar DoublyInfinite Down DownArrow DownArrowBar DownArrowUpArrow DownLeftRightVector DownLeftTeeVector DownLeftVector DownLeftVectorBar DownRightTeeVector DownRightVector DownRightVectorBar Downsample DownTee DownTeeArrow DownValues DragAndDrop DrawEdges DrawFrontFaces DrawHighlighted Drop DSolve Dt DualLinearProgramming DualSystemsModel DumpGet DumpSave DuplicateFreeQ Dynamic DynamicBox DynamicBoxOptions DynamicEvaluationTimeout DynamicLocation DynamicModule DynamicModuleBox DynamicModuleBoxOptions DynamicModuleParent DynamicModuleValues DynamicName DynamicNamespace DynamicReference DynamicSetting DynamicUpdating DynamicWrapper DynamicWrapperBox DynamicWrapperBoxOptions E EccentricityCentrality EdgeAdd EdgeBetweennessCentrality EdgeCapacity EdgeCapForm EdgeColor EdgeConnectivity EdgeCost EdgeCount EdgeCoverQ EdgeDashing EdgeDelete EdgeDetect EdgeForm EdgeIndex EdgeJoinForm EdgeLabeling EdgeLabels EdgeLabelStyle EdgeList EdgeOpacity EdgeQ EdgeRenderingFunction EdgeRules EdgeShapeFunction EdgeStyle EdgeThickness EdgeWeight Editable EditButtonSettings EditCellTagsSettings EditDistance EffectiveInterest Eigensystem Eigenvalues EigenvectorCentrality Eigenvectors Element ElementData Eliminate EliminationOrder EllipticE EllipticExp EllipticExpPrime EllipticF EllipticFilterModel EllipticK EllipticLog EllipticNomeQ EllipticPi EllipticReducedHalfPeriods EllipticTheta EllipticThetaPrime EmitSound EmphasizeSyntaxErrors EmpiricalDistribution Empty EmptyGraphQ EnableConsolePrintPacket Enabled Encode End EndAdd EndDialogPacket EndFrontEndInteractionPacket EndOfFile EndOfLine EndOfString EndPackage EngineeringForm Enter EnterExpressionPacket EnterTextPacket Entropy EntropyFilter Environment Epilog Equal EqualColumns EqualRows EqualTilde EquatedTo Equilibrium EquirippleFilterKernel Equivalent Erf Erfc Erfi ErlangB ErlangC ErlangDistribution Erosion ErrorBox ErrorBoxOptions ErrorNorm ErrorPacket ErrorsDialogSettings EstimatedDistribution EstimatedProcess EstimatorGains EstimatorRegulator EuclideanDistance EulerE EulerGamma EulerianGraphQ EulerPhi Evaluatable Evaluate Evaluated EvaluatePacket EvaluationCell EvaluationCompletionAction EvaluationElements EvaluationMode EvaluationMonitor EvaluationNotebook EvaluationObject EvaluationOrder Evaluator EvaluatorNames EvenQ EventData EventEvaluator EventHandler EventHandlerTag EventLabels ExactBlackmanWindow ExactNumberQ ExactRootIsolation ExampleData Except ExcludedForms ExcludePods Exclusions ExclusionsStyle Exists Exit ExitDialog Exp Expand ExpandAll ExpandDenominator ExpandFileName ExpandNumerator Expectation ExpectationE ExpectedValue ExpGammaDistribution ExpIntegralE ExpIntegralEi Exponent ExponentFunction ExponentialDistribution ExponentialFamily ExponentialGeneratingFunction ExponentialMovingAverage ExponentialPowerDistribution ExponentPosition ExponentStep Export ExportAutoReplacements ExportPacket ExportString Expression ExpressionCell ExpressionPacket ExpToTrig ExtendedGCD Extension ExtentElementFunction ExtentMarkers ExtentSize ExternalCall ExternalDataCharacterEncoding Extract ExtractArchive ExtremeValueDistribution FaceForm FaceGrids FaceGridsStyle Factor FactorComplete Factorial Factorial2 FactorialMoment FactorialMomentGeneratingFunction FactorialPower FactorInteger FactorList FactorSquareFree FactorSquareFreeList FactorTerms FactorTermsList Fail FailureDistribution False FARIMAProcess FEDisableConsolePrintPacket FeedbackSector FeedbackSectorStyle FeedbackType FEEnableConsolePrintPacket Fibonacci FieldHint FieldHintStyle FieldMasked FieldSize File FileBaseName FileByteCount FileDate FileExistsQ FileExtension FileFormat FileHash FileInformation FileName FileNameDepth FileNameDialogSettings FileNameDrop FileNameJoin FileNames FileNameSetter FileNameSplit FileNameTake FilePrint FileType FilledCurve FilledCurveBox Filling FillingStyle FillingTransform FilterRules FinancialBond FinancialData FinancialDerivative FinancialIndicator Find FindArgMax FindArgMin FindClique FindClusters FindCurvePath FindDistributionParameters FindDivisions FindEdgeCover FindEdgeCut FindEulerianCycle FindFaces FindFile FindFit FindGeneratingFunction FindGeoLocation FindGeometricTransform FindGraphCommunities FindGraphIsomorphism FindGraphPartition FindHamiltonianCycle FindIndependentEdgeSet FindIndependentVertexSet FindInstance FindIntegerNullVector FindKClan FindKClique FindKClub FindKPlex FindLibrary FindLinearRecurrence FindList FindMaximum FindMaximumFlow FindMaxValue FindMinimum FindMinimumCostFlow FindMinimumCut FindMinValue FindPermutation FindPostmanTour FindProcessParameters FindRoot FindSequenceFunction FindSettings FindShortestPath FindShortestTour FindThreshold FindVertexCover FindVertexCut Fine FinishDynamic FiniteAbelianGroupCount FiniteGroupCount FiniteGroupData First FirstPassageTimeDistribution FischerGroupFi22 FischerGroupFi23 FischerGroupFi24Prime FisherHypergeometricDistribution FisherRatioTest FisherZDistribution Fit FitAll FittedModel FixedPoint FixedPointList FlashSelection Flat Flatten FlattenAt FlatTopWindow FlipView Floor FlushPrintOutputPacket Fold FoldList Font FontColor FontFamily FontForm FontName FontOpacity FontPostScriptName FontProperties FontReencoding FontSize FontSlant FontSubstitutions FontTracking FontVariations FontWeight For ForAll Format FormatRules FormatType FormatTypeAutoConvert FormatValues FormBox FormBoxOptions FortranForm Forward ForwardBackward Fourier FourierCoefficient FourierCosCoefficient FourierCosSeries FourierCosTransform FourierDCT FourierDCTFilter FourierDCTMatrix FourierDST FourierDSTMatrix FourierMatrix FourierParameters FourierSequenceTransform FourierSeries FourierSinCoefficient FourierSinSeries FourierSinTransform FourierTransform FourierTrigSeries FractionalBrownianMotionProcess FractionalPart FractionBox FractionBoxOptions FractionLine Frame FrameBox FrameBoxOptions Framed FrameInset FrameLabel Frameless FrameMargins FrameStyle FrameTicks FrameTicksStyle FRatioDistribution FrechetDistribution FreeQ FrequencySamplingFilterKernel FresnelC FresnelS Friday FrobeniusNumber FrobeniusSolve FromCharacterCode FromCoefficientRules FromContinuedFraction FromDate FromDigits FromDMS Front FrontEndDynamicExpression FrontEndEventActions FrontEndExecute FrontEndObject FrontEndResource FrontEndResourceString FrontEndStackSize FrontEndToken FrontEndTokenExecute FrontEndValueCache FrontEndVersion FrontFaceColor FrontFaceOpacity Full FullAxes FullDefinition FullForm FullGraphics FullOptions FullSimplify Function FunctionExpand FunctionInterpolation FunctionSpace FussellVeselyImportance GaborFilter GaborMatrix GaborWavelet GainMargins GainPhaseMargins Gamma GammaDistribution GammaRegularized GapPenalty Gather GatherBy GaugeFaceElementFunction GaugeFaceStyle GaugeFrameElementFunction GaugeFrameSize GaugeFrameStyle GaugeLabels GaugeMarkers GaugeStyle GaussianFilter GaussianIntegers GaussianMatrix GaussianWindow GCD GegenbauerC General GeneralizedLinearModelFit GenerateConditions GeneratedCell GeneratedParameters GeneratingFunction Generic GenericCylindricalDecomposition GenomeData GenomeLookup GeodesicClosing GeodesicDilation GeodesicErosion GeodesicOpening GeoDestination GeodesyData GeoDirection GeoDistance GeoGridPosition GeometricBrownianMotionProcess GeometricDistribution GeometricMean GeometricMeanFilter GeometricTransformation GeometricTransformation3DBox GeometricTransformation3DBoxOptions GeometricTransformationBox GeometricTransformationBoxOptions GeoPosition GeoPositionENU GeoPositionXYZ GeoProjectionData GestureHandler GestureHandlerTag Get GetBoundingBoxSizePacket GetContext GetEnvironment GetFileName GetFrontEndOptionsDataPacket GetLinebreakInformationPacket GetMenusPacket GetPageBreakInformationPacket Glaisher GlobalClusteringCoefficient GlobalPreferences GlobalSession Glow GoldenRatio GompertzMakehamDistribution GoodmanKruskalGamma GoodmanKruskalGammaTest Goto Grad Gradient GradientFilter GradientOrientationFilter Graph GraphAssortativity GraphCenter GraphComplement GraphData GraphDensity GraphDiameter GraphDifference GraphDisjointUnion GraphDistance GraphDistanceMatrix GraphElementData GraphEmbedding GraphHighlight GraphHighlightStyle GraphHub Graphics Graphics3D Graphics3DBox Graphics3DBoxOptions GraphicsArray GraphicsBaseline GraphicsBox GraphicsBoxOptions GraphicsColor GraphicsColumn GraphicsComplex GraphicsComplex3DBox GraphicsComplex3DBoxOptions GraphicsComplexBox GraphicsComplexBoxOptions GraphicsContents GraphicsData GraphicsGrid GraphicsGridBox GraphicsGroup GraphicsGroup3DBox GraphicsGroup3DBoxOptions GraphicsGroupBox GraphicsGroupBoxOptions GraphicsGrouping GraphicsHighlightColor GraphicsRow GraphicsSpacing GraphicsStyle GraphIntersection GraphLayout GraphLinkEfficiency GraphPeriphery GraphPlot GraphPlot3D GraphPower GraphPropertyDistribution GraphQ GraphRadius GraphReciprocity GraphRoot GraphStyle GraphUnion Gray GrayLevel GreatCircleDistance Greater GreaterEqual GreaterEqualLess GreaterFullEqual GreaterGreater GreaterLess GreaterSlantEqual GreaterTilde Green Grid GridBaseline GridBox GridBoxAlignment GridBoxBackground GridBoxDividers GridBoxFrame GridBoxItemSize GridBoxItemStyle GridBoxOptions GridBoxSpacings GridCreationSettings GridDefaultElement GridElementStyleOptions GridFrame GridFrameMargins GridGraph GridLines GridLinesStyle GroebnerBasis GroupActionBase GroupCentralizer GroupElementFromWord GroupElementPosition GroupElementQ GroupElements GroupElementToWord GroupGenerators GroupMultiplicationTable GroupOrbits GroupOrder GroupPageBreakWithin GroupSetwiseStabilizer GroupStabilizer GroupStabilizerChain Gudermannian GumbelDistribution HaarWavelet HadamardMatrix HalfNormalDistribution HamiltonianGraphQ HammingDistance HammingWindow HankelH1 HankelH2 HankelMatrix HannPoissonWindow HannWindow HaradaNortonGroupHN HararyGraph HarmonicMean HarmonicMeanFilter HarmonicNumber Hash HashTable Haversine HazardFunction Head HeadCompose Heads HeavisideLambda HeavisidePi HeavisideTheta HeldGroupHe HeldPart HelpBrowserLookup HelpBrowserNotebook HelpBrowserSettings HermiteDecomposition HermiteH HermitianMatrixQ HessenbergDecomposition Hessian HexadecimalCharacter Hexahedron HexahedronBox HexahedronBoxOptions HiddenSurface HighlightGraph HighlightImage HighpassFilter HigmanSimsGroupHS HilbertFilter HilbertMatrix Histogram Histogram3D HistogramDistribution HistogramList HistogramTransform HistogramTransformInterpolation HitMissTransform HITSCentrality HodgeDual HoeffdingD HoeffdingDTest Hold HoldAll HoldAllComplete HoldComplete HoldFirst HoldForm HoldPattern HoldRest HolidayCalendar HomeDirectory HomePage Horizontal HorizontalForm HorizontalGauge HorizontalScrollPosition HornerForm HotellingTSquareDistribution HoytDistribution HTMLSave Hue HumpDownHump HumpEqual HurwitzLerchPhi HurwitzZeta HyperbolicDistribution HypercubeGraph HyperexponentialDistribution Hyperfactorial Hypergeometric0F1 Hypergeometric0F1Regularized Hypergeometric1F1 Hypergeometric1F1Regularized Hypergeometric2F1 Hypergeometric2F1Regularized HypergeometricDistribution HypergeometricPFQ HypergeometricPFQRegularized HypergeometricU Hyperlink HyperlinkCreationSettings Hyphenation HyphenationOptions HypoexponentialDistribution HypothesisTestData I Identity IdentityMatrix If IgnoreCase Im Image Image3D Image3DSlices ImageAccumulate ImageAdd ImageAdjust ImageAlign ImageApply ImageAspectRatio ImageAssemble ImageCache ImageCacheValid ImageCapture ImageChannels ImageClip ImageColorSpace ImageCompose ImageConvolve ImageCooccurrence ImageCorners ImageCorrelate ImageCorrespondingPoints ImageCrop ImageData ImageDataPacket ImageDeconvolve ImageDemosaic ImageDifference ImageDimensions ImageDistance ImageEffect ImageFeatureTrack ImageFileApply ImageFileFilter ImageFileScan ImageFilter ImageForestingComponents ImageForwardTransformation ImageHistogram ImageKeypoints ImageLevels ImageLines ImageMargins ImageMarkers ImageMeasurements ImageMultiply ImageOffset ImagePad ImagePadding ImagePartition ImagePeriodogram ImagePerspectiveTransformation ImageQ ImageRangeCache ImageReflect ImageRegion ImageResize ImageResolution ImageRotate ImageRotated ImageScaled ImageScan ImageSize ImageSizeAction ImageSizeCache ImageSizeMultipliers ImageSizeRaw ImageSubtract ImageTake ImageTransformation ImageTrim ImageType ImageValue ImageValuePositions Implies Import ImportAutoReplacements ImportString ImprovementImportance In IncidenceGraph IncidenceList IncidenceMatrix IncludeConstantBasis IncludeFileExtension IncludePods IncludeSingularTerm Increment Indent IndentingNewlineSpacings IndentMaxFraction IndependenceTest IndependentEdgeSetQ IndependentUnit IndependentVertexSetQ Indeterminate IndexCreationOptions Indexed IndexGraph IndexTag Inequality InexactNumberQ InexactNumbers Infinity Infix Information Inherited InheritScope Initialization InitializationCell InitializationCellEvaluation InitializationCellWarning InlineCounterAssignments InlineCounterIncrements InlineRules Inner Inpaint Input InputAliases InputAssumptions InputAutoReplacements InputField InputFieldBox InputFieldBoxOptions InputForm InputGrouping InputNamePacket InputNotebook InputPacket InputSettings InputStream InputString InputStringPacket InputToBoxFormPacket Insert InsertionPointObject InsertResults Inset Inset3DBox Inset3DBoxOptions InsetBox InsetBoxOptions Install InstallService InString Integer IntegerDigits IntegerExponent IntegerLength IntegerPart IntegerPartitions IntegerQ Integers IntegerString Integral Integrate Interactive InteractiveTradingChart Interlaced Interleaving InternallyBalancedDecomposition InterpolatingFunction InterpolatingPolynomial Interpolation InterpolationOrder InterpolationPoints InterpolationPrecision Interpretation InterpretationBox InterpretationBoxOptions InterpretationFunction InterpretTemplate InterquartileRange Interrupt InterruptSettings Intersection Interval IntervalIntersection IntervalMemberQ IntervalUnion Inverse InverseBetaRegularized InverseCDF InverseChiSquareDistribution InverseContinuousWaveletTransform InverseDistanceTransform InverseEllipticNomeQ InverseErf InverseErfc InverseFourier InverseFourierCosTransform InverseFourierSequenceTransform InverseFourierSinTransform InverseFourierTransform InverseFunction InverseFunctions InverseGammaDistribution InverseGammaRegularized InverseGaussianDistribution InverseGudermannian InverseHaversine InverseJacobiCD InverseJacobiCN InverseJacobiCS InverseJacobiDC InverseJacobiDN InverseJacobiDS InverseJacobiNC InverseJacobiND InverseJacobiNS InverseJacobiSC InverseJacobiSD InverseJacobiSN InverseLaplaceTransform InversePermutation InverseRadon InverseSeries InverseSurvivalFunction InverseWaveletTransform InverseWeierstrassP InverseZTransform Invisible InvisibleApplication InvisibleTimes IrreduciblePolynomialQ IsolatingInterval IsomorphicGraphQ IsotopeData Italic Item ItemBox ItemBoxOptions ItemSize ItemStyle ItoProcess JaccardDissimilarity JacobiAmplitude Jacobian JacobiCD JacobiCN JacobiCS JacobiDC JacobiDN JacobiDS JacobiNC JacobiND JacobiNS JacobiP JacobiSC JacobiSD JacobiSN JacobiSymbol JacobiZeta JankoGroupJ1 JankoGroupJ2 JankoGroupJ3 JankoGroupJ4 JarqueBeraALMTest JohnsonDistribution Join Joined JoinedCurve JoinedCurveBox JoinForm JordanDecomposition JordanModelDecomposition K KagiChart KaiserBesselWindow KaiserWindow KalmanEstimator KalmanFilter KarhunenLoeveDecomposition KaryTree KatzCentrality KCoreComponents KDistribution KelvinBei KelvinBer KelvinKei KelvinKer KendallTau KendallTauTest KernelExecute KernelMixtureDistribution KernelObject Kernels Ket Khinchin KirchhoffGraph KirchhoffMatrix KleinInvariantJ KnightTourGraph KnotData KnownUnitQ KolmogorovSmirnovTest KroneckerDelta KroneckerModelDecomposition KroneckerProduct KroneckerSymbol KuiperTest KumaraswamyDistribution Kurtosis KuwaharaFilter Label Labeled LabeledSlider LabelingFunction LabelStyle LaguerreL LambdaComponents LambertW LanczosWindow LandauDistribution Language LanguageCategory LaplaceDistribution LaplaceTransform Laplacian LaplacianFilter LaplacianGaussianFilter Large Larger Last Latitude LatitudeLongitude LatticeData LatticeReduce Launch LaunchKernels LayeredGraphPlot LayerSizeFunction LayoutInformation LCM LeafCount LeapYearQ LeastSquares LeastSquaresFilterKernel Left LeftArrow LeftArrowBar LeftArrowRightArrow LeftDownTeeVector LeftDownVector LeftDownVectorBar LeftRightArrow LeftRightVector LeftTee LeftTeeArrow LeftTeeVector LeftTriangle LeftTriangleBar LeftTriangleEqual LeftUpDownVector LeftUpTeeVector LeftUpVector LeftUpVectorBar LeftVector LeftVectorBar LegendAppearance Legended LegendFunction LegendLabel LegendLayout LegendMargins LegendMarkers LegendMarkerSize LegendreP LegendreQ LegendreType Length LengthWhile LerchPhi Less LessEqual LessEqualGreater LessFullEqual LessGreater LessLess LessSlantEqual LessTilde LetterCharacter LetterQ Level LeveneTest LeviCivitaTensor LevyDistribution Lexicographic LibraryFunction LibraryFunctionError LibraryFunctionInformation LibraryFunctionLoad LibraryFunctionUnload LibraryLoad LibraryUnload LicenseID LiftingFilterData LiftingWaveletTransform LightBlue LightBrown LightCyan Lighter LightGray LightGreen Lighting LightingAngle LightMagenta LightOrange LightPink LightPurple LightRed LightSources LightYellow Likelihood Limit LimitsPositioning LimitsPositioningTokens LindleyDistribution Line Line3DBox LinearFilter LinearFractionalTransform LinearModelFit LinearOffsetFunction LinearProgramming LinearRecurrence LinearSolve LinearSolveFunction LineBox LineBreak LinebreakAdjustments LineBreakChart LineBreakWithin LineColor LineForm LineGraph LineIndent LineIndentMaxFraction LineIntegralConvolutionPlot LineIntegralConvolutionScale LineLegend LineOpacity LineSpacing LineWrapParts LinkActivate LinkClose LinkConnect LinkConnectedQ LinkCreate LinkError LinkFlush LinkFunction LinkHost LinkInterrupt LinkLaunch LinkMode LinkObject LinkOpen LinkOptions LinkPatterns LinkProtocol LinkRead LinkReadHeld LinkReadyQ Links LinkWrite LinkWriteHeld LiouvilleLambda List Listable ListAnimate ListContourPlot ListContourPlot3D ListConvolve ListCorrelate ListCurvePathPlot ListDeconvolve ListDensityPlot Listen ListFourierSequenceTransform ListInterpolation ListLineIntegralConvolutionPlot ListLinePlot ListLogLinearPlot ListLogLogPlot ListLogPlot ListPicker ListPickerBox ListPickerBoxBackground ListPickerBoxOptions ListPlay ListPlot ListPlot3D ListPointPlot3D ListPolarPlot ListQ ListStreamDensityPlot ListStreamPlot ListSurfacePlot3D ListVectorDensityPlot ListVectorPlot ListVectorPlot3D ListZTransform Literal LiteralSearch LocalClusteringCoefficient LocalizeVariables LocationEquivalenceTest LocationTest Locator LocatorAutoCreate LocatorBox LocatorBoxOptions LocatorCentering LocatorPane LocatorPaneBox LocatorPaneBoxOptions LocatorRegion Locked Log Log10 Log2 LogBarnesG LogGamma LogGammaDistribution LogicalExpand LogIntegral LogisticDistribution LogitModelFit LogLikelihood LogLinearPlot LogLogisticDistribution LogLogPlot LogMultinormalDistribution LogNormalDistribution LogPlot LogRankTest LogSeriesDistribution LongEqual Longest LongestAscendingSequence LongestCommonSequence LongestCommonSequencePositions LongestCommonSubsequence LongestCommonSubsequencePositions LongestMatch LongForm Longitude LongLeftArrow LongLeftRightArrow LongRightArrow Loopback LoopFreeGraphQ LowerCaseQ LowerLeftArrow LowerRightArrow LowerTriangularize LowpassFilter LQEstimatorGains LQGRegulator LQOutputRegulatorGains LQRegulatorGains LUBackSubstitution LucasL LuccioSamiComponents LUDecomposition LyapunovSolve LyonsGroupLy MachineID MachineName MachineNumberQ MachinePrecision MacintoshSystemPageSetup Magenta Magnification Magnify MainSolve MaintainDynamicCaches Majority MakeBoxes MakeExpression MakeRules MangoldtLambda ManhattanDistance Manipulate Manipulator MannWhitneyTest MantissaExponent Manual Map MapAll MapAt MapIndexed MAProcess MapThread MarcumQ MardiaCombinedTest MardiaKurtosisTest MardiaSkewnessTest MarginalDistribution MarkovProcessProperties Masking MatchingDissimilarity MatchLocalNameQ MatchLocalNames MatchQ Material MathematicaNotation MathieuC MathieuCharacteristicA MathieuCharacteristicB MathieuCharacteristicExponent MathieuCPrime MathieuGroupM11 MathieuGroupM12 MathieuGroupM22 MathieuGroupM23 MathieuGroupM24 MathieuS MathieuSPrime MathMLForm MathMLText Matrices MatrixExp MatrixForm MatrixFunction MatrixLog MatrixPlot MatrixPower MatrixQ MatrixRank Max MaxBend MaxDetect MaxExtraBandwidths MaxExtraConditions MaxFeatures MaxFilter Maximize MaxIterations MaxMemoryUsed MaxMixtureKernels MaxPlotPoints MaxPoints MaxRecursion MaxStableDistribution MaxStepFraction MaxSteps MaxStepSize MaxValue MaxwellDistribution McLaughlinGroupMcL Mean MeanClusteringCoefficient MeanDegreeConnectivity MeanDeviation MeanFilter MeanGraphDistance MeanNeighborDegree MeanShift MeanShiftFilter Median MedianDeviation MedianFilter Medium MeijerG MeixnerDistribution MemberQ MemoryConstrained MemoryInUse Menu MenuAppearance MenuCommandKey MenuEvaluator MenuItem MenuPacket MenuSortingValue MenuStyle MenuView MergeDifferences Mesh MeshFunctions MeshRange MeshShading MeshStyle Message MessageDialog MessageList MessageName MessageOptions MessagePacket Messages MessagesNotebook MetaCharacters MetaInformation Method MethodOptions MexicanHatWavelet MeyerWavelet Min MinDetect MinFilter MinimalPolynomial MinimalStateSpaceModel Minimize Minors MinRecursion MinSize MinStableDistribution Minus MinusPlus MinValue Missing MissingDataMethod MittagLefflerE MixedRadix MixedRadixQuantity MixtureDistribution Mod Modal Mode Modular ModularLambda Module Modulus MoebiusMu Moment Momentary MomentConvert MomentEvaluate MomentGeneratingFunction Monday Monitor MonomialList MonomialOrder MonsterGroupM MorletWavelet MorphologicalBinarize MorphologicalBranchPoints MorphologicalComponents MorphologicalEulerNumber MorphologicalGraph MorphologicalPerimeter MorphologicalTransform Most MouseAnnotation MouseAppearance MouseAppearanceTag MouseButtons Mouseover MousePointerNote MousePosition MovingAverage MovingMedian MoyalDistribution MultiedgeStyle MultilaunchWarning MultiLetterItalics MultiLetterStyle MultilineFunction Multinomial MultinomialDistribution MultinormalDistribution MultiplicativeOrder Multiplicity Multiselection MultivariateHypergeometricDistribution MultivariatePoissonDistribution MultivariateTDistribution N NakagamiDistribution NameQ Names NamespaceBox Nand NArgMax NArgMin NBernoulliB NCache NDSolve NDSolveValue Nearest NearestFunction NeedCurrentFrontEndPackagePacket NeedCurrentFrontEndSymbolsPacket NeedlemanWunschSimilarity Needs Negative NegativeBinomialDistribution NegativeMultinomialDistribution NeighborhoodGraph Nest NestedGreaterGreater NestedLessLess NestedScriptRules NestList NestWhile NestWhileList NevilleThetaC NevilleThetaD NevilleThetaN NevilleThetaS NewPrimitiveStyle NExpectation Next NextPrime NHoldAll NHoldFirst NHoldRest NicholsGridLines NicholsPlot NIntegrate NMaximize NMaxValue NMinimize NMinValue NominalVariables NonAssociative NoncentralBetaDistribution NoncentralChiSquareDistribution NoncentralFRatioDistribution NoncentralStudentTDistribution NonCommutativeMultiply NonConstants None NonlinearModelFit NonlocalMeansFilter NonNegative NonPositive Nor NorlundB Norm Normal NormalDistribution NormalGrouping Normalize NormalizedSquaredEuclideanDistance NormalsFunction NormFunction Not NotCongruent NotCupCap NotDoubleVerticalBar Notebook NotebookApply NotebookAutoSave NotebookClose NotebookConvertSettings NotebookCreate NotebookCreateReturnObject NotebookDefault NotebookDelete NotebookDirectory NotebookDynamicExpression NotebookEvaluate NotebookEventActions NotebookFileName NotebookFind NotebookFindReturnObject NotebookGet NotebookGetLayoutInformationPacket NotebookGetMisspellingsPacket NotebookInformation NotebookInterfaceObject NotebookLocate NotebookObject NotebookOpen NotebookOpenReturnObject NotebookPath NotebookPrint NotebookPut NotebookPutReturnObject NotebookRead NotebookResetGeneratedCells Notebooks NotebookSave NotebookSaveAs NotebookSelection NotebookSetupLayoutInformationPacket NotebooksMenu NotebookWrite NotElement NotEqualTilde NotExists NotGreater NotGreaterEqual NotGreaterFullEqual NotGreaterGreater NotGreaterLess NotGreaterSlantEqual NotGreaterTilde NotHumpDownHump NotHumpEqual NotLeftTriangle NotLeftTriangleBar NotLeftTriangleEqual NotLess NotLessEqual NotLessFullEqual NotLessGreater NotLessLess NotLessSlantEqual NotLessTilde NotNestedGreaterGreater NotNestedLessLess NotPrecedes NotPrecedesEqual NotPrecedesSlantEqual NotPrecedesTilde NotReverseElement NotRightTriangle NotRightTriangleBar NotRightTriangleEqual NotSquareSubset NotSquareSubsetEqual NotSquareSuperset NotSquareSupersetEqual NotSubset NotSubsetEqual NotSucceeds NotSucceedsEqual NotSucceedsSlantEqual NotSucceedsTilde NotSuperset NotSupersetEqual NotTilde NotTildeEqual NotTildeFullEqual NotTildeTilde NotVerticalBar NProbability NProduct NProductFactors NRoots NSolve NSum NSumTerms Null NullRecords NullSpace NullWords Number NumberFieldClassNumber NumberFieldDiscriminant NumberFieldFundamentalUnits NumberFieldIntegralBasis NumberFieldNormRepresentatives NumberFieldRegulator NumberFieldRootsOfUnity NumberFieldSignature NumberForm NumberFormat NumberMarks NumberMultiplier NumberPadding NumberPoint NumberQ NumberSeparator NumberSigns NumberString Numerator NumericFunction NumericQ NuttallWindow NValues NyquistGridLines NyquistPlot O ObservabilityGramian ObservabilityMatrix ObservableDecomposition ObservableModelQ OddQ Off Offset OLEData On ONanGroupON OneIdentity Opacity Open OpenAppend Opener OpenerBox OpenerBoxOptions OpenerView OpenFunctionInspectorPacket Opening OpenRead OpenSpecialOptions OpenTemporary OpenWrite Operate OperatingSystem OptimumFlowData Optional OptionInspectorSettings OptionQ Options OptionsPacket OptionsPattern OptionValue OptionValueBox OptionValueBoxOptions Or Orange Order OrderDistribution OrderedQ Ordering Orderless OrnsteinUhlenbeckProcess Orthogonalize Out Outer OutputAutoOverwrite OutputControllabilityMatrix OutputControllableModelQ OutputForm OutputFormData OutputGrouping OutputMathEditExpression OutputNamePacket OutputResponse OutputSizeLimit OutputStream Over OverBar OverDot Overflow OverHat Overlaps Overlay OverlayBox OverlayBoxOptions Overscript OverscriptBox OverscriptBoxOptions OverTilde OverVector OwenT OwnValues PackingMethod PaddedForm Padding PadeApproximant PadLeft PadRight PageBreakAbove PageBreakBelow PageBreakWithin PageFooterLines PageFooters PageHeaderLines PageHeaders PageHeight PageRankCentrality PageWidth PairedBarChart PairedHistogram PairedSmoothHistogram PairedTTest PairedZTest PaletteNotebook PalettePath Pane PaneBox PaneBoxOptions Panel PanelBox PanelBoxOptions Paneled PaneSelector PaneSelectorBox PaneSelectorBoxOptions PaperWidth ParabolicCylinderD ParagraphIndent ParagraphSpacing ParallelArray ParallelCombine ParallelDo ParallelEvaluate Parallelization Parallelize ParallelMap ParallelNeeds ParallelProduct ParallelSubmit ParallelSum ParallelTable ParallelTry Parameter ParameterEstimator ParameterMixtureDistribution ParameterVariables ParametricFunction ParametricNDSolve ParametricNDSolveValue ParametricPlot ParametricPlot3D ParentConnect ParentDirectory ParentForm Parenthesize ParentList ParetoDistribution Part PartialCorrelationFunction PartialD ParticleData Partition PartitionsP PartitionsQ ParzenWindow PascalDistribution PassEventsDown PassEventsUp Paste PasteBoxFormInlineCells PasteButton Path PathGraph PathGraphQ Pattern PatternSequence PatternTest PauliMatrix PaulWavelet Pause PausedTime PDF PearsonChiSquareTest PearsonCorrelationTest PearsonDistribution PerformanceGoal PeriodicInterpolation Periodogram PeriodogramArray PermutationCycles PermutationCyclesQ PermutationGroup PermutationLength PermutationList PermutationListQ PermutationMax PermutationMin PermutationOrder PermutationPower PermutationProduct PermutationReplace Permutations PermutationSupport Permute PeronaMalikFilter Perpendicular PERTDistribution PetersenGraph PhaseMargins Pi Pick PIDData PIDDerivativeFilter PIDFeedforward PIDTune Piecewise PiecewiseExpand PieChart PieChart3D PillaiTrace PillaiTraceTest Pink Pivoting PixelConstrained PixelValue PixelValuePositions Placed Placeholder PlaceholderReplace Plain PlanarGraphQ Play PlayRange Plot Plot3D Plot3Matrix PlotDivision PlotJoined PlotLabel PlotLayout PlotLegends PlotMarkers PlotPoints PlotRange PlotRangeClipping PlotRangePadding PlotRegion PlotStyle Plus PlusMinus Pochhammer PodStates PodWidth Point Point3DBox PointBox PointFigureChart PointForm PointLegend PointSize PoissonConsulDistribution PoissonDistribution PoissonProcess PoissonWindow PolarAxes PolarAxesOrigin PolarGridLines PolarPlot PolarTicks PoleZeroMarkers PolyaAeppliDistribution PolyGamma Polygon Polygon3DBox Polygon3DBoxOptions PolygonBox PolygonBoxOptions PolygonHoleScale PolygonIntersections PolygonScale PolyhedronData PolyLog PolynomialExtendedGCD PolynomialForm PolynomialGCD PolynomialLCM PolynomialMod PolynomialQ PolynomialQuotient PolynomialQuotientRemainder PolynomialReduce PolynomialRemainder Polynomials PopupMenu PopupMenuBox PopupMenuBoxOptions PopupView PopupWindow Position Positive PositiveDefiniteMatrixQ PossibleZeroQ Postfix PostScript Power PowerDistribution PowerExpand PowerMod PowerModList PowerSpectralDensity PowersRepresentations PowerSymmetricPolynomial Precedence PrecedenceForm Precedes PrecedesEqual PrecedesSlantEqual PrecedesTilde Precision PrecisionGoal PreDecrement PredictionRoot PreemptProtect PreferencesPath Prefix PreIncrement Prepend PrependTo PreserveImageOptions Previous PriceGraphDistribution PrimaryPlaceholder Prime PrimeNu PrimeOmega PrimePi PrimePowerQ PrimeQ Primes PrimeZetaP PrimitiveRoot PrincipalComponents PrincipalValue Print PrintAction PrintForm PrintingCopies PrintingOptions PrintingPageRange PrintingStartingPageNumber PrintingStyleEnvironment PrintPrecision PrintTemporary Prism PrismBox PrismBoxOptions PrivateCellOptions PrivateEvaluationOptions PrivateFontOptions PrivateFrontEndOptions PrivateNotebookOptions PrivatePaths Probability ProbabilityDistribution ProbabilityPlot ProbabilityPr ProbabilityScalePlot ProbitModelFit ProcessEstimator ProcessParameterAssumptions ProcessParameterQ ProcessStateDomain ProcessTimeDomain Product ProductDistribution ProductLog ProgressIndicator ProgressIndicatorBox ProgressIndicatorBoxOptions Projection Prolog PromptForm Properties Property PropertyList PropertyValue Proportion Proportional Protect Protected ProteinData Pruning PseudoInverse Purple Put PutAppend Pyramid PyramidBox PyramidBoxOptions QBinomial QFactorial QGamma QHypergeometricPFQ QPochhammer QPolyGamma QRDecomposition QuadraticIrrationalQ Quantile QuantilePlot Quantity QuantityForm QuantityMagnitude QuantityQ QuantityUnit Quartics QuartileDeviation Quartiles QuartileSkewness QueueingNetworkProcess QueueingProcess QueueProperties Quiet Quit Quotient QuotientRemainder RadialityCentrality RadicalBox RadicalBoxOptions RadioButton RadioButtonBar RadioButtonBox RadioButtonBoxOptions Radon RamanujanTau RamanujanTauL RamanujanTauTheta RamanujanTauZ Random RandomChoice RandomComplex RandomFunction RandomGraph RandomImage RandomInteger RandomPermutation RandomPrime RandomReal RandomSample RandomSeed RandomVariate RandomWalkProcess Range RangeFilter RangeSpecification RankedMax RankedMin Raster Raster3D Raster3DBox Raster3DBoxOptions RasterArray RasterBox RasterBoxOptions Rasterize RasterSize Rational RationalFunctions Rationalize Rationals Ratios Raw RawArray RawBoxes RawData RawMedium RayleighDistribution Re Read ReadList ReadProtected Real RealBlockDiagonalForm RealDigits RealExponent Reals Reap Record RecordLists RecordSeparators Rectangle RectangleBox RectangleBoxOptions RectangleChart RectangleChart3D RecurrenceFilter RecurrenceTable RecurringDigitsForm Red Reduce RefBox ReferenceLineStyle ReferenceMarkers ReferenceMarkerStyle Refine ReflectionMatrix ReflectionTransform Refresh RefreshRate RegionBinarize RegionFunction RegionPlot RegionPlot3D RegularExpression Regularization Reinstall Release ReleaseHold ReliabilityDistribution ReliefImage ReliefPlot Remove RemoveAlphaChannel RemoveAsynchronousTask Removed RemoveInputStreamMethod RemoveOutputStreamMethod RemoveProperty RemoveScheduledTask RenameDirectory RenameFile RenderAll RenderingOptions RenewalProcess RenkoChart Repeated RepeatedNull RepeatedString Replace ReplaceAll ReplaceHeldPart ReplaceImageValue ReplaceList ReplacePart ReplacePixelValue ReplaceRepeated Resampling Rescale RescalingTransform ResetDirectory ResetMenusPacket ResetScheduledTask Residue Resolve Rest Resultant ResumePacket Return ReturnExpressionPacket ReturnInputFormPacket ReturnPacket ReturnTextPacket Reverse ReverseBiorthogonalSplineWavelet ReverseElement ReverseEquilibrium ReverseGraph ReverseUpEquilibrium RevolutionAxis RevolutionPlot3D RGBColor RiccatiSolve RiceDistribution RidgeFilter RiemannR RiemannSiegelTheta RiemannSiegelZ Riffle Right RightArrow RightArrowBar RightArrowLeftArrow RightCosetRepresentative RightDownTeeVector RightDownVector RightDownVectorBar RightTee RightTeeArrow RightTeeVector RightTriangle RightTriangleBar RightTriangleEqual RightUpDownVector RightUpTeeVector RightUpVector RightUpVectorBar RightVector RightVectorBar RiskAchievementImportance RiskReductionImportance RogersTanimotoDissimilarity Root RootApproximant RootIntervals RootLocusPlot RootMeanSquare RootOfUnityQ RootReduce Roots RootSum Rotate RotateLabel RotateLeft RotateRight RotationAction RotationBox RotationBoxOptions RotationMatrix RotationTransform Round RoundImplies RoundingRadius Row RowAlignments RowBackgrounds RowBox RowHeights RowLines RowMinHeight RowReduce RowsEqual RowSpacings RSolve RudvalisGroupRu Rule RuleCondition RuleDelayed RuleForm RulerUnits Run RunScheduledTask RunThrough RuntimeAttributes RuntimeOptions RussellRaoDissimilarity SameQ SameTest SampleDepth SampledSoundFunction SampledSoundList SampleRate SamplingPeriod SARIMAProcess SARMAProcess SatisfiabilityCount SatisfiabilityInstances SatisfiableQ Saturday Save Saveable SaveAutoDelete SaveDefinitions SawtoothWave Scale Scaled ScaleDivisions ScaledMousePosition ScaleOrigin ScalePadding ScaleRanges ScaleRangeStyle ScalingFunctions ScalingMatrix ScalingTransform Scan ScheduledTaskActiveQ ScheduledTaskData ScheduledTaskObject ScheduledTasks SchurDecomposition ScientificForm ScreenRectangle ScreenStyleEnvironment ScriptBaselineShifts ScriptLevel ScriptMinSize ScriptRules ScriptSizeMultipliers Scrollbars ScrollingOptions ScrollPosition Sec Sech SechDistribution SectionGrouping SectorChart SectorChart3D SectorOrigin SectorSpacing SeedRandom Select Selectable SelectComponents SelectedCells SelectedNotebook Selection SelectionAnimate SelectionCell SelectionCellCreateCell SelectionCellDefaultStyle SelectionCellParentStyle SelectionCreateCell SelectionDebuggerTag SelectionDuplicateCell SelectionEvaluate SelectionEvaluateCreateCell SelectionMove SelectionPlaceholder SelectionSetStyle SelectWithContents SelfLoops SelfLoopStyle SemialgebraicComponentInstances SendMail Sequence SequenceAlignment SequenceForm SequenceHold SequenceLimit Series SeriesCoefficient SeriesData SessionTime Set SetAccuracy SetAlphaChannel SetAttributes Setbacks SetBoxFormNamesPacket SetDelayed SetDirectory SetEnvironment SetEvaluationNotebook SetFileDate SetFileLoadingContext SetNotebookStatusLine SetOptions SetOptionsPacket SetPrecision SetProperty SetSelectedNotebook SetSharedFunction SetSharedVariable SetSpeechParametersPacket SetStreamPosition SetSystemOptions Setter SetterBar SetterBox SetterBoxOptions Setting SetValue Shading Shallow ShannonWavelet ShapiroWilkTest Share Sharpen ShearingMatrix ShearingTransform ShenCastanMatrix Short ShortDownArrow Shortest ShortestMatch ShortestPathFunction ShortLeftArrow ShortRightArrow ShortUpArrow Show ShowAutoStyles ShowCellBracket ShowCellLabel ShowCellTags ShowClosedCellArea ShowContents ShowControls ShowCursorTracker ShowGroupOpenCloseIcon ShowGroupOpener ShowInvisibleCharacters ShowPageBreaks ShowPredictiveInterface ShowSelection ShowShortBoxForm ShowSpecialCharacters ShowStringCharacters ShowSyntaxStyles ShrinkingDelay ShrinkWrapBoundingBox SiegelTheta SiegelTukeyTest Sign Signature SignedRankTest SignificanceLevel SignPadding SignTest SimilarityRules SimpleGraph SimpleGraphQ Simplify Sin Sinc SinghMaddalaDistribution SingleEvaluation SingleLetterItalics SingleLetterStyle SingularValueDecomposition SingularValueList SingularValuePlot SingularValues Sinh SinhIntegral SinIntegral SixJSymbol Skeleton SkeletonTransform SkellamDistribution Skewness SkewNormalDistribution Skip SliceDistribution Slider Slider2D Slider2DBox Slider2DBoxOptions SliderBox SliderBoxOptions SlideView Slot SlotSequence Small SmallCircle Smaller SmithDelayCompensator SmithWatermanSimilarity SmoothDensityHistogram SmoothHistogram SmoothHistogram3D SmoothKernelDistribution SocialMediaData Socket SokalSneathDissimilarity Solve SolveAlways SolveDelayed Sort SortBy Sound SoundAndGraphics SoundNote SoundVolume Sow Space SpaceForm Spacer Spacings Span SpanAdjustments SpanCharacterRounding SpanFromAbove SpanFromBoth SpanFromLeft SpanLineThickness SpanMaxSize SpanMinSize SpanningCharacters SpanSymmetric SparseArray SpatialGraphDistribution Speak SpeakTextPacket SpearmanRankTest SpearmanRho Spectrogram SpectrogramArray Specularity SpellingCorrection SpellingDictionaries SpellingDictionariesPath SpellingOptions SpellingSuggestionsPacket Sphere SphereBox SphericalBesselJ SphericalBesselY SphericalHankelH1 SphericalHankelH2 SphericalHarmonicY SphericalPlot3D SphericalRegion SpheroidalEigenvalue SpheroidalJoiningFactor SpheroidalPS SpheroidalPSPrime SpheroidalQS SpheroidalQSPrime SpheroidalRadialFactor SpheroidalS1 SpheroidalS1Prime SpheroidalS2 SpheroidalS2Prime Splice SplicedDistribution SplineClosed SplineDegree SplineKnots SplineWeights Split SplitBy SpokenString Sqrt SqrtBox SqrtBoxOptions Square SquaredEuclideanDistance SquareFreeQ SquareIntersection SquaresR SquareSubset SquareSubsetEqual SquareSuperset SquareSupersetEqual SquareUnion SquareWave StabilityMargins StabilityMarginsStyle StableDistribution Stack StackBegin StackComplete StackInhibit StandardDeviation StandardDeviationFilter StandardForm Standardize StandbyDistribution Star StarGraph StartAsynchronousTask StartingStepSize StartOfLine StartOfString StartScheduledTask StartupSound StateDimensions StateFeedbackGains StateOutputEstimator StateResponse StateSpaceModel StateSpaceRealization StateSpaceTransform StationaryDistribution StationaryWaveletPacketTransform StationaryWaveletTransform StatusArea StatusCentrality StepMonitor StieltjesGamma StirlingS1 StirlingS2 StopAsynchronousTask StopScheduledTask StrataVariables StratonovichProcess StreamColorFunction StreamColorFunctionScaling StreamDensityPlot StreamPlot StreamPoints StreamPosition Streams StreamScale StreamStyle String StringBreak StringByteCount StringCases StringCount StringDrop StringExpression StringForm StringFormat StringFreeQ StringInsert StringJoin StringLength StringMatchQ StringPosition StringQ StringReplace StringReplaceList StringReplacePart StringReverse StringRotateLeft StringRotateRight StringSkeleton StringSplit StringTake StringToStream StringTrim StripBoxes StripOnInput StripWrapperBoxes StrokeForm StructuralImportance StructuredArray StructuredSelection StruveH StruveL Stub StudentTDistribution Style StyleBox StyleBoxAutoDelete StyleBoxOptions StyleData StyleDefinitions StyleForm StyleKeyMapping StyleMenuListing StyleNameDialogSettings StyleNames StylePrint StyleSheetPath Subfactorial Subgraph SubMinus SubPlus SubresultantPolynomialRemainders SubresultantPolynomials Subresultants Subscript SubscriptBox SubscriptBoxOptions Subscripted Subset SubsetEqual Subsets SubStar Subsuperscript SubsuperscriptBox SubsuperscriptBoxOptions Subtract SubtractFrom SubValues Succeeds SucceedsEqual SucceedsSlantEqual SucceedsTilde SuchThat Sum SumConvergence Sunday SuperDagger SuperMinus SuperPlus Superscript SuperscriptBox SuperscriptBoxOptions Superset SupersetEqual SuperStar Surd SurdForm SurfaceColor SurfaceGraphics SurvivalDistribution SurvivalFunction SurvivalModel SurvivalModelFit SuspendPacket SuzukiDistribution SuzukiGroupSuz SwatchLegend Switch Symbol SymbolName SymletWavelet Symmetric SymmetricGroup SymmetricMatrixQ SymmetricPolynomial SymmetricReduction Symmetrize SymmetrizedArray SymmetrizedArrayRules SymmetrizedDependentComponents SymmetrizedIndependentComponents SymmetrizedReplacePart SynchronousInitialization SynchronousUpdating Syntax SyntaxForm SyntaxInformation SyntaxLength SyntaxPacket SyntaxQ SystemDialogInput SystemException SystemHelpPath SystemInformation SystemInformationData SystemOpen SystemOptions SystemsModelDelay SystemsModelDelayApproximate SystemsModelDelete SystemsModelDimensions SystemsModelExtract SystemsModelFeedbackConnect SystemsModelLabels SystemsModelOrder SystemsModelParallelConnect SystemsModelSeriesConnect SystemsModelStateFeedbackConnect SystemStub Tab TabFilling Table TableAlignments TableDepth TableDirections TableForm TableHeadings TableSpacing TableView TableViewBox TabSpacings TabView TabViewBox TabViewBoxOptions TagBox TagBoxNote TagBoxOptions TaggingRules TagSet TagSetDelayed TagStyle TagUnset Take TakeWhile Tally Tan Tanh TargetFunctions TargetUnits TautologyQ TelegraphProcess TemplateBox TemplateBoxOptions TemplateSlotSequence TemporalData Temporary TemporaryVariable TensorContract TensorDimensions TensorExpand TensorProduct TensorQ TensorRank TensorReduce TensorSymmetry TensorTranspose TensorWedge Tetrahedron TetrahedronBox TetrahedronBoxOptions TeXForm TeXSave Text Text3DBox Text3DBoxOptions TextAlignment TextBand TextBoundingBox TextBox TextCell TextClipboardType TextData TextForm TextJustification TextLine TextPacket TextParagraph TextRecognize TextRendering TextStyle Texture TextureCoordinateFunction TextureCoordinateScaling Therefore ThermometerGauge Thick Thickness Thin Thinning ThisLink ThompsonGroupTh Thread ThreeJSymbol Threshold Through Throw Thumbnail Thursday Ticks TicksStyle Tilde TildeEqual TildeFullEqual TildeTilde TimeConstrained TimeConstraint Times TimesBy TimeSeriesForecast TimeSeriesInvertibility TimeUsed TimeValue TimeZone Timing Tiny TitleGrouping TitsGroupT ToBoxes ToCharacterCode ToColor ToContinuousTimeModel ToDate ToDiscreteTimeModel ToeplitzMatrix ToExpression ToFileName Together Toggle ToggleFalse Toggler TogglerBar TogglerBox TogglerBoxOptions ToHeldExpression ToInvertibleTimeSeries TokenWords Tolerance ToLowerCase ToNumberField TooBig Tooltip TooltipBox TooltipBoxOptions TooltipDelay TooltipStyle Top TopHatTransform TopologicalSort ToRadicals ToRules ToString Total TotalHeight TotalVariationFilter TotalWidth TouchscreenAutoZoom TouchscreenControlPlacement ToUpperCase Tr Trace TraceAbove TraceAction TraceBackward TraceDepth TraceDialog TraceForward TraceInternal TraceLevel TraceOff TraceOn TraceOriginal TracePrint TraceScan TrackedSymbols TradingChart TraditionalForm TraditionalFunctionNotation TraditionalNotation TraditionalOrder TransferFunctionCancel TransferFunctionExpand TransferFunctionFactor TransferFunctionModel TransferFunctionPoles TransferFunctionTransform TransferFunctionZeros TransformationFunction TransformationFunctions TransformationMatrix TransformedDistribution TransformedField Translate TranslationTransform TransparentColor Transpose TreeForm TreeGraph TreeGraphQ TreePlot TrendStyle TriangleWave TriangularDistribution Trig TrigExpand TrigFactor TrigFactorList Trigger TrigReduce TrigToExp TrimmedMean True TrueQ TruncatedDistribution TsallisQExponentialDistribution TsallisQGaussianDistribution TTest Tube TubeBezierCurveBox TubeBezierCurveBoxOptions TubeBox TubeBSplineCurveBox TubeBSplineCurveBoxOptions Tuesday TukeyLambdaDistribution TukeyWindow Tuples TuranGraph TuringMachine Transparent UnateQ Uncompress Undefined UnderBar Underflow Underlined Underoverscript UnderoverscriptBox UnderoverscriptBoxOptions Underscript UnderscriptBox UnderscriptBoxOptions UndirectedEdge UndirectedGraph UndirectedGraphQ UndocumentedTestFEParserPacket UndocumentedTestGetSelectionPacket Unequal Unevaluated UniformDistribution UniformGraphDistribution UniformSumDistribution Uninstall Union UnionPlus Unique UnitBox UnitConvert UnitDimensions Unitize UnitRootTest UnitSimplify UnitStep UnitTriangle UnitVector Unprotect UnsameQ UnsavedVariables Unset UnsetShared UntrackedVariables Up UpArrow UpArrowBar UpArrowDownArrow Update UpdateDynamicObjects UpdateDynamicObjectsSynchronous UpdateInterval UpDownArrow UpEquilibrium UpperCaseQ UpperLeftArrow UpperRightArrow UpperTriangularize Upsample UpSet UpSetDelayed UpTee UpTeeArrow UpValues URL URLFetch URLFetchAsynchronous URLSave URLSaveAsynchronous UseGraphicsRange Using UsingFrontEnd V2Get ValidationLength Value ValueBox ValueBoxOptions ValueForm ValueQ ValuesData Variables Variance VarianceEquivalenceTest VarianceEstimatorFunction VarianceGammaDistribution VarianceTest VectorAngle VectorColorFunction VectorColorFunctionScaling VectorDensityPlot VectorGlyphData VectorPlot VectorPlot3D VectorPoints VectorQ Vectors VectorScale VectorStyle Vee Verbatim Verbose VerboseConvertToPostScriptPacket VerifyConvergence VerifySolutions VerifyTestAssumptions Version VersionNumber VertexAdd VertexCapacity VertexColors VertexComponent VertexConnectivity VertexCoordinateRules VertexCoordinates VertexCorrelationSimilarity VertexCosineSimilarity VertexCount VertexCoverQ VertexDataCoordinates VertexDegree VertexDelete VertexDiceSimilarity VertexEccentricity VertexInComponent VertexInDegree VertexIndex VertexJaccardSimilarity VertexLabeling VertexLabels VertexLabelStyle VertexList VertexNormals VertexOutComponent VertexOutDegree VertexQ VertexRenderingFunction VertexReplace VertexShape VertexShapeFunction VertexSize VertexStyle VertexTextureCoordinates VertexWeight Vertical VerticalBar VerticalForm VerticalGauge VerticalSeparator VerticalSlider VerticalTilde ViewAngle ViewCenter ViewMatrix ViewPoint ViewPointSelectorSettings ViewPort ViewRange ViewVector ViewVertical VirtualGroupData Visible VisibleCell VoigtDistribution VonMisesDistribution WaitAll WaitAsynchronousTask WaitNext WaitUntil WakebyDistribution WalleniusHypergeometricDistribution WaringYuleDistribution WatershedComponents WatsonUSquareTest WattsStrogatzGraphDistribution WaveletBestBasis WaveletFilterCoefficients WaveletImagePlot WaveletListPlot WaveletMapIndexed WaveletMatrixPlot WaveletPhi WaveletPsi WaveletScale WaveletScalogram WaveletThreshold WeaklyConnectedComponents WeaklyConnectedGraphQ WeakStationarity WeatherData WeberE Wedge Wednesday WeibullDistribution WeierstrassHalfPeriods WeierstrassInvariants WeierstrassP WeierstrassPPrime WeierstrassSigma WeierstrassZeta WeightedAdjacencyGraph WeightedAdjacencyMatrix WeightedData WeightedGraphQ Weights WelchWindow WheelGraph WhenEvent Which While White Whitespace WhitespaceCharacter WhittakerM WhittakerW WienerFilter WienerProcess WignerD WignerSemicircleDistribution WilksW WilksWTest WindowClickSelect WindowElements WindowFloating WindowFrame WindowFrameElements WindowMargins WindowMovable WindowOpacity WindowSelected WindowSize WindowStatusArea WindowTitle WindowToolbars WindowWidth With WolframAlpha WolframAlphaDate WolframAlphaQuantity WolframAlphaResult Word WordBoundary WordCharacter WordData WordSearch WordSeparators WorkingPrecision Write WriteString Wronskian XMLElement XMLObject Xnor Xor Yellow YuleDissimilarity ZernikeR ZeroSymmetric ZeroTest ZeroWidthTimes Zeta ZetaZero ZipfDistribution ZTest ZTransform $Aborted $ActivationGroupID $ActivationKey $ActivationUserRegistered $AddOnsDirectory $AssertFunction $Assumptions $AsynchronousTask $BaseDirectory $BatchInput $BatchOutput $BoxForms $ByteOrdering $Canceled $CharacterEncoding $CharacterEncodings $CommandLine $CompilationTarget $ConditionHold $ConfiguredKernels $Context $ContextPath $ControlActiveSetting $CreationDate $CurrentLink $DateStringFormat $DefaultFont $DefaultFrontEnd $DefaultImagingDevice $DefaultPath $Display $DisplayFunction $DistributedContexts $DynamicEvaluation $Echo $Epilog $ExportFormats $Failed $FinancialDataSource $FormatType $FrontEnd $FrontEndSession $GeoLocation $HistoryLength $HomeDirectory $HTTPCookies $IgnoreEOF $ImagingDevices $ImportFormats $InitialDirectory $Input $InputFileName $InputStreamMethods $Inspector $InstallationDate $InstallationDirectory $InterfaceEnvironment $IterationLimit $KernelCount $KernelID $Language $LaunchDirectory $LibraryPath $LicenseExpirationDate $LicenseID $LicenseProcesses $LicenseServer $LicenseSubprocesses $LicenseType $Line $Linked $LinkSupported $LoadedFiles $MachineAddresses $MachineDomain $MachineDomains $MachineEpsilon $MachineID $MachineName $MachinePrecision $MachineType $MaxExtraPrecision $MaxLicenseProcesses $MaxLicenseSubprocesses $MaxMachineNumber $MaxNumber $MaxPiecewiseCases $MaxPrecision $MaxRootDegree $MessageGroups $MessageList $MessagePrePrint $Messages $MinMachineNumber $MinNumber $MinorReleaseNumber $MinPrecision $ModuleNumber $NetworkLicense $NewMessage $NewSymbol $Notebooks $NumberMarks $Off $OperatingSystem $Output $OutputForms $OutputSizeLimit $OutputStreamMethods $Packages $ParentLink $ParentProcessID $PasswordFile $PatchLevelID $Path $PathnameSeparator $PerformanceGoal $PipeSupported $Post $Pre $PreferencesDirectory $PrePrint $PreRead $PrintForms $PrintLiteral $ProcessID $ProcessorCount $ProcessorType $ProductInformation $ProgramName $RandomState $RecursionLimit $ReleaseNumber $RootDirectory $ScheduledTask $ScriptCommandLine $SessionID $SetParentLink $SharedFunctions $SharedVariables $SoundDisplay $SoundDisplayFunction $SuppressInputFormHeads $SynchronousEvaluation $SyntaxHandler $System $SystemCharacterEncoding $SystemID $SystemWordLength $TemporaryDirectory $TemporaryPrefix $TextStyle $TimedOut $TimeUnit $TimeZone $TopDirectory $TraceOff $TraceOn $TracePattern $TracePostAction $TracePreAction $Urgent $UserAddOnsDirectory $UserBaseDirectory $UserDocumentsDirectory $UserName $Version $VersionNumber",
    c: [{
        cN: "comment",
        b: /\(\*/,
        e: /\*\)/
      },
      a.ASM, a.QSM, a.CNM, {
        cN: "list",
        b: /\{/,
        e: /\}/,
        i: /:/
      }
    ]
  }
});
hljs.registerLanguage("cs", function(b) {
  var a = "abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async await ascending descending from get group into join let orderby partial select set value var where yield";
  return {
    k: a,
    c: [{
        cN: "comment",
        b: "///",
        e: "$",
        rB: true,
        c: [{
          cN: "xmlDocTag",
          b: "///|<!--|-->"
        }, {
          cN: "xmlDocTag",
          b: "</?",
          e: ">"
        }]
      },
      b.CLCM, b.CBLCLM, {
        cN: "preprocessor",
        b: "#",
        e: "$",
        k: "if else elif endif define undef warning error line region endregion pragma checksum"
      }, {
        cN: "string",
        b: '@"',
        e: '"',
        c: [{
          b: '""'
        }]
      },
      b.ASM, b.QSM, b.CNM, {
        bK: "protected public private internal",
        e: /[{;=]/,
        k: a,
        c: [{
          bK: "class namespace interface",
          starts: {
            c: [b.TM]
          }
        }, {
          b: b.IR + "\\s*\\(",
          rB: true,
          c: [b.TM]
        }]
      }
    ]
  }
});
hljs.registerLanguage("http", function(a) {
  return {
    i: "\\S",
    c: [{
      cN: "status",
      b: "^HTTP/[0-9\\.]+",
      e: "$",
      c: [{
        cN: "number",
        b: "\\b\\d{3}\\b"
      }]
    }, {
      cN: "request",
      b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
      rB: true,
      e: "$",
      c: [{
        cN: "string",
        b: " ",
        e: " ",
        eB: true,
        eE: true
      }]
    }, {
      cN: "attribute",
      b: "^\\w",
      e: ": ",
      eE: true,
      i: "\\n|\\s|=",
      starts: {
        cN: "string",
        e: "$"
      }
    }, {
      b: "\\n\\n",
      starts: {
        sL: "",
        eW: true
      }
    }]
  }
});
hljs.registerLanguage("rust", function(b) {
  var c = {
    cN: "number",
    b: "\\b(0[xb][A-Za-z0-9_]+|[0-9_]+(\\.[0-9_]+)?([uif](8|16|32|64)?)?)",
    r: 0
  };
  var a = "assert bool break char check claim comm const cont copy dir do drop else enum extern export f32 f64 fail false float fn for i16 i32 i64 i8 if impl int let log loop match mod move mut priv pub pure ref return self static str struct task true trait type u16 u32 u64 u8 uint unsafe use vec while";
  return {
    k: a,
    i: "</",
    c: [b.CLCM, b.CBLCLM, b.inherit(b.QSM, {
      i: null
    }), b.ASM, c, {
      cN: "function",
      bK: "fn",
      e: "(\\(|<)",
      c: [b.UTM]
    }, {
      cN: "preprocessor",
      b: "#\\[",
      e: "\\]"
    }, {
      bK: "type",
      e: "(=|<)",
      c: [b.UTM],
      i: "\\S"
    }, {
      bK: "trait enum",
      e: "({|<)",
      c: [b.UTM],
      i: "\\S"
    }]
  }
});
hljs.registerLanguage("handlebars", function(b) {
  var a = "each in with if else unless bindattr action collection debugger log outlet template unbound view yield";
  return {
    cI: true,
    sL: "xml",
    subLanguageMode: "continuous",
    c: [{
      cN: "expression",
      b: "{{",
      e: "}}",
      c: [{
        cN: "begin-block",
        b: "#[a-zA-Z- .]+",
        k: a
      }, {
        cN: "string",
        b: '"',
        e: '"'
      }, {
        cN: "end-block",
        b: "\\/[a-zA-Z- .]+",
        k: a
      }, {
        cN: "variable",
        b: "[a-zA-Z-.]+",
        k: a
      }]
    }]
  }
});
hljs.registerLanguage("cmake", function(a) {
  return {
    cI: true,
    k: {
      keyword: "add_custom_command add_custom_target add_definitions add_dependencies add_executable add_library add_subdirectory add_test aux_source_directory break build_command cmake_minimum_required cmake_policy configure_file create_test_sourcelist define_property else elseif enable_language enable_testing endforeach endfunction endif endmacro endwhile execute_process export find_file find_library find_package find_path find_program fltk_wrap_ui foreach function get_cmake_property get_directory_property get_filename_component get_property get_source_file_property get_target_property get_test_property if include include_directories include_external_msproject include_regular_expression install link_directories load_cache load_command macro mark_as_advanced message option output_required_files project qt_wrap_cpp qt_wrap_ui remove_definitions return separate_arguments set set_directory_properties set_property set_source_files_properties set_target_properties set_tests_properties site_name source_group string target_link_libraries try_compile try_run unset variable_watch while build_name exec_program export_library_dependencies install_files install_programs install_targets link_libraries make_directory remove subdir_depends subdirs use_mangled_mesa utility_source variable_requires write_file qt5_use_modules qt5_use_package qt5_wrap_cpp on off true false and or",
      operator: "equal less greater strless strgreater strequal matches"
    },
    c: [{
        cN: "envvar",
        b: "\\${",
        e: "}"
      },
      a.HCM, a.QSM, a.NM
    ]
  }
});
hljs.registerLanguage("lisp", function(h) {
  var k = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*";
  var l = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?";
  var j = {
    cN: "shebang",
    b: "^#!",
    e: "$"
  };
  var b = {
    cN: "literal",
    b: "\\b(t{1}|nil)\\b"
  };
  var d = {
    cN: "number",
    v: [{
      b: l,
      r: 0
    }, {
      b: "#b[0-1]+(/[0-1]+)?"
    }, {
      b: "#o[0-7]+(/[0-7]+)?"
    }, {
      b: "#x[0-9a-f]+(/[0-9a-f]+)?"
    }, {
      b: "#c\\(" + l + " +" + l,
      e: "\\)"
    }]
  };
  var g = h.inherit(h.QSM, {
    i: null
  });
  var m = {
    cN: "comment",
    b: ";",
    e: "$"
  };
  var f = {
    cN: "variable",
    b: "\\*",
    e: "\\*"
  };
  var n = {
    cN: "keyword",
    b: "[:&]" + k
  };
  var c = {
    b: "\\(",
    e: "\\)",
    c: ["self", b, g, d]
  };
  var a = {
    cN: "quoted",
    c: [d, g, f, n, c],
    v: [{
      b: "['`]\\(",
      e: "\\)",
    }, {
      b: "\\(quote ",
      e: "\\)",
      k: {
        title: "quote"
      },
    }]
  };
  var i = {
    cN: "list",
    b: "\\(",
    e: "\\)"
  };
  var e = {
    eW: true,
    r: 0
  };
  i.c = [{
      cN: "title",
      b: k
    },
    e
  ];
  e.c = [a, i, b, d, g, m, f, n];
  return {
    i: /\S/,
    c: [d, j, b, g, m, a, i]
  }
});
hljs.registerLanguage("rib", function(a) {
  return {
    k: "ArchiveRecord AreaLightSource Atmosphere Attribute AttributeBegin AttributeEnd Basis Begin Blobby Bound Clipping ClippingPlane Color ColorSamples ConcatTransform Cone CoordinateSystem CoordSysTransform CropWindow Curves Cylinder DepthOfField Detail DetailRange Disk Displacement Display End ErrorHandler Exposure Exterior Format FrameAspectRatio FrameBegin FrameEnd GeneralPolygon GeometricApproximation Geometry Hider Hyperboloid Identity Illuminate Imager Interior LightSource MakeCubeFaceEnvironment MakeLatLongEnvironment MakeShadow MakeTexture Matte MotionBegin MotionEnd NuPatch ObjectBegin ObjectEnd ObjectInstance Opacity Option Orientation Paraboloid Patch PatchMesh Perspective PixelFilter PixelSamples PixelVariance Points PointsGeneralPolygons PointsPolygons Polygon Procedural Projection Quantize ReadArchive RelativeDetail ReverseOrientation Rotate Scale ScreenWindow ShadingInterpolation ShadingRate Shutter Sides Skew SolidBegin SolidEnd Sphere SubdivisionMesh Surface TextureCoordinates Torus Transform TransformBegin TransformEnd TransformPoints Translate TrimCurve WorldBegin WorldEnd",
    i: "</",
    c: [a.HCM, a.CNM, a.ASM, a.QSM]
  }
});
hljs.registerLanguage("css", function(a) {
  var b = "[a-zA-Z-][a-zA-Z0-9_-]*";
  var c = {
    cN: "function",
    b: b + "\\(",
    e: "\\)",
    c: ["self", a.NM, a.ASM, a.QSM]
  };
  return {
    cI: true,
    i: "[=/|']",
    c: [a.CBLCLM, {
      cN: "id",
      b: "\\#[A-Za-z0-9_-]+"
    }, {
      cN: "class",
      b: "\\.[A-Za-z0-9_-]+",
      r: 0
    }, {
      cN: "attr_selector",
      b: "\\[",
      e: "\\]",
      i: "$"
    }, {
      cN: "pseudo",
      b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
    }, {
      cN: "at_rule",
      b: "@(font-face|page)",
      l: "[a-z-]+",
      k: "font-face page"
    }, {
      cN: "at_rule",
      b: "@",
      e: "[{;]",
      c: [{
        cN: "keyword",
        b: /\S+/
      }, {
        b: /\s/,
        eW: true,
        eE: true,
        r: 0,
        c: [c, a.ASM, a.QSM, a.NM]
      }]
    }, {
      cN: "tag",
      b: b,
      r: 0
    }, {
      cN: "rules",
      b: "{",
      e: "}",
      i: "[^\\s]",
      r: 0,
      c: [a.CBLCLM, {
        cN: "rule",
        b: "[^\\s]",
        rB: true,
        e: ";",
        eW: true,
        c: [{
          cN: "attribute",
          b: "[A-Z\\_\\.\\-]+",
          e: ":",
          eE: true,
          i: "[^\\s]",
          starts: {
            cN: "value",
            eW: true,
            eE: true,
            c: [c, a.NM, a.QSM, a.ASM, a.CBLCLM, {
              cN: "hexcolor",
              b: "#[0-9A-Fa-f]+"
            }, {
              cN: "important",
              b: "!important"
            }]
          }
        }]
      }]
    }]
  }
});
hljs.registerLanguage("avrasm", function(a) {
  return {
    cI: true,
    k: {
      keyword: "adc add adiw and andi asr bclr bld brbc brbs brcc brcs break breq brge brhc brhs brid brie brlo brlt brmi brne brpl brsh brtc brts brvc brvs bset bst call cbi cbr clc clh cli cln clr cls clt clv clz com cp cpc cpi cpse dec eicall eijmp elpm eor fmul fmuls fmulsu icall ijmp in inc jmp ld ldd ldi lds lpm lsl lsr mov movw mul muls mulsu neg nop or ori out pop push rcall ret reti rjmp rol ror sbc sbr sbrc sbrs sec seh sbi sbci sbic sbis sbiw sei sen ser ses set sev sez sleep spm st std sts sub subi swap tst wdr",
      built_in: "r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 r16 r17 r18 r19 r20 r21 r22 r23 r24 r25 r26 r27 r28 r29 r30 r31 x|0 xh xl y|0 yh yl z|0 zh zl ucsr1c udr1 ucsr1a ucsr1b ubrr1l ubrr1h ucsr0c ubrr0h tccr3c tccr3a tccr3b tcnt3h tcnt3l ocr3ah ocr3al ocr3bh ocr3bl ocr3ch ocr3cl icr3h icr3l etimsk etifr tccr1c ocr1ch ocr1cl twcr twdr twar twsr twbr osccal xmcra xmcrb eicra spmcsr spmcr portg ddrg ping portf ddrf sreg sph spl xdiv rampz eicrb eimsk gimsk gicr eifr gifr timsk tifr mcucr mcucsr tccr0 tcnt0 ocr0 assr tccr1a tccr1b tcnt1h tcnt1l ocr1ah ocr1al ocr1bh ocr1bl icr1h icr1l tccr2 tcnt2 ocr2 ocdr wdtcr sfior eearh eearl eedr eecr porta ddra pina portb ddrb pinb portc ddrc pinc portd ddrd pind spdr spsr spcr udr0 ucsr0a ucsr0b ubrr0l acsr admux adcsr adch adcl porte ddre pine pinf"
    },
    c: [a.CBLCLM, {
        cN: "comment",
        b: ";",
        e: "$",
        r: 0
      },
      a.CNM, a.BNM, {
        cN: "number",
        b: "\\b(\\$[a-zA-Z0-9]+|0o[0-7]+)"
      },
      a.QSM, {
        cN: "string",
        b: "'",
        e: "[^\\\\]'",
        i: "[^\\\\][^']"
      }, {
        cN: "label",
        b: "^[A-Za-z0-9_.$]+:"
      }, {
        cN: "preprocessor",
        b: "#",
        e: "$"
      }, {
        cN: "preprocessor",
        b: "\\.[a-zA-Z]+"
      }, {
        cN: "localvars",
        b: "@[0-9]+"
      }
    ]
  }
});
hljs.registerLanguage("apache", function(a) {
  var b = {
    cN: "number",
    b: "[\\$%]\\d+"
  };
  return {
    cI: true,
    c: [a.HCM, {
      cN: "tag",
      b: "</?",
      e: ">"
    }, {
      cN: "keyword",
      b: /\w+/,
      r: 0,
      k: {
        common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
      },
      starts: {
        e: /$/,
        r: 0,
        k: {
          literal: "on off all"
        },
        c: [{
            cN: "sqbracket",
            b: "\\s\\[",
            e: "\\]$"
          }, {
            cN: "cbracket",
            b: "[\\$%]\\{",
            e: "\\}",
            c: ["self", b]
          },
          b, a.QSM
        ]
      }
    }],
    i: /\S/
  }
});
hljs.registerLanguage("1c", function(b) {
  var f = "[a-zA-Zа-яА-Я][a-zA-Z0-9_а-яА-Я]*";
  var c = "возврат дата для если и или иначе иначеесли исключение конецесли конецпопытки конецпроцедуры конецфункции конеццикла константа не перейти перем перечисление по пока попытка прервать продолжить процедура строка тогда фс функция цикл число экспорт";
  var e = "ansitooem oemtoansi ввестивидсубконто ввестидату ввестизначение ввестиперечисление ввестипериод ввестиплансчетов ввестистроку ввестичисло вопрос восстановитьзначение врег выбранныйплансчетов вызватьисключение датагод датамесяц датачисло добавитьмесяц завершитьработусистемы заголовоксистемы записьжурналарегистрации запуститьприложение зафиксироватьтранзакцию значениевстроку значениевстрокувнутр значениевфайл значениеизстроки значениеизстрокивнутр значениеизфайла имякомпьютера имяпользователя каталогвременныхфайлов каталогиб каталогпользователя каталогпрограммы кодсимв командасистемы конгода конецпериодаби конецрассчитанногопериодаби конецстандартногоинтервала конквартала конмесяца коннедели лев лог лог10 макс максимальноеколичествосубконто мин монопольныйрежим названиеинтерфейса названиенабораправ назначитьвид назначитьсчет найти найтипомеченныенаудаление найтиссылки началопериодаби началостандартногоинтервала начатьтранзакцию начгода начквартала начмесяца начнедели номерднягода номерднянедели номернеделигода нрег обработкаожидания окр описаниеошибки основнойжурналрасчетов основнойплансчетов основнойязык открытьформу открытьформумодально отменитьтранзакцию очиститьокносообщений периодстр полноеимяпользователя получитьвремята получитьдатута получитьдокументта получитьзначенияотбора получитьпозициюта получитьпустоезначение получитьта прав праводоступа предупреждение префиксавтонумерации пустаястрока пустоезначение рабочаядаттьпустоезначение рабочаядата разделительстраниц разделительстрок разм разобратьпозициюдокумента рассчитатьрегистрына рассчитатьрегистрыпо сигнал симв символтабуляции создатьобъект сокрл сокрлп сокрп сообщить состояние сохранитьзначение сред статусвозврата стрдлина стрзаменить стрколичествострок стрполучитьстроку  стрчисловхождений сформироватьпозициюдокумента счетпокоду текущаядата текущеевремя типзначения типзначениястр удалитьобъекты установитьтана установитьтапо фиксшаблон формат цел шаблон";
  var a = {
    cN: "dquote",
    b: '""'
  };
  var d = {
    cN: "string",
    b: '"',
    e: '"|$',
    c: [a]
  };
  var g = {
    cN: "string",
    b: "\\|",
    e: '"|$',
    c: [a]
  };
  return {
    cI: true,
    l: f,
    k: {
      keyword: c,
      built_in: e
    },
    c: [b.CLCM, b.NM, d, g, {
      cN: "function",
      b: "(процедура|функция)",
      e: "$",
      l: f,
      k: "процедура функция",
      c: [b.inherit(b.TM, {
          b: f
        }), {
          cN: "tail",
          eW: true,
          c: [{
            cN: "params",
            b: "\\(",
            e: "\\)",
            l: f,
            k: "знач",
            c: [d, g]
          }, {
            cN: "export",
            b: "экспорт",
            eW: true,
            l: f,
            k: "экспорт",
            c: [b.CLCM]
          }]
        },
        b.CLCM
      ]
    }, {
      cN: "preprocessor",
      b: "#",
      e: "$"
    }, {
      cN: "date",
      b: "'\\d{2}\\.\\d{2}\\.(\\d{2}|\\d{4})'"
    }]
  }
});
hljs.registerLanguage("javascript", function(a) {
  return {
    aliases: ["js"],
    k: {
      keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
      literal: "true false null undefined NaN Infinity",
      built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require"
    },
    c: [{
        cN: "pi",
        b: /^\s*('|")use strict('|")/,
        r: 10
      },
      a.ASM, a.QSM, a.CLCM, a.CBLCLM, a.CNM, {
        b: "(" + a.RSR + "|\\b(case|return|throw)\\b)\\s*",
        k: "return throw case",
        c: [a.CLCM, a.CBLCLM, a.REGEXP_MODE, {
          b: /</,
          e: />;/,
          r: 0,
          sL: "xml"
        }],
        r: 0
      }, {
        cN: "function",
        bK: "function",
        e: /\{/,
        c: [a.inherit(a.TM, {
          b: /[A-Za-z$_][0-9A-Za-z$_]*/
        }), {
          cN: "params",
          b: /\(/,
          e: /\)/,
          c: [a.CLCM, a.CBLCLM],
          i: /["'\(]/
        }],
        i: /\[|%/
      }, {
        b: /\$[(.]/
      }, {
        b: "\\." + a.IR,
        r: 0
      }
    ]
  }
});
hljs.registerLanguage("vbnet", function(a) {
  return {
    cI: true,
    k: {
      keyword: "addhandler addressof alias and andalso aggregate ansi as assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into is isfalse isnot istrue join key let lib like loop me mid mod module mustinherit mustoverride mybase myclass namespace narrowing new next not notinheritable notoverridable of off on operator option optional or order orelse overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim rem removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly xor",
      built_in: "boolean byte cbool cbyte cchar cdate cdec cdbl char cint clng cobj csbyte cshort csng cstr ctype date decimal directcast double gettype getxmlnamespace iif integer long object sbyte short single string trycast typeof uinteger ulong ushort",
      literal: "true false nothing"
    },
    i: "//|{|}|endif|gosub|variant|wend",
    c: [a.inherit(a.QSM, {
        c: [{
          b: '""'
        }]
      }), {
        cN: "comment",
        b: "'",
        e: "$",
        rB: true,
        c: [{
          cN: "xmlDocTag",
          b: "'''|<!--|-->"
        }, {
          cN: "xmlDocTag",
          b: "</?",
          e: ">"
        }, ]
      },
      a.CNM, {
        cN: "preprocessor",
        b: "#",
        e: "$",
        k: "if else elseif end region externalsource"
      },
    ]
  }
});
hljs.registerLanguage("fsharp", function(a) {
  return {
    k: "abstract and as assert base begin class default delegate do done downcast downto elif else end exception extern false finally for fun function global if in inherit inline interface internal lazy let match member module mutable namespace new null of open or override private public rec return sig static struct then to true try type upcast use val void when while with yield",
    c: [{
        cN: "string",
        b: '@"',
        e: '"',
        c: [{
          b: '""'
        }]
      }, {
        cN: "string",
        b: '"""',
        e: '"""'
      }, {
        cN: "comment",
        b: "\\(\\*",
        e: "\\*\\)"
      }, {
        cN: "class",
        bK: "type",
        e: "\\(|=|$",
        c: [a.UTM]
      }, {
        cN: "annotation",
        b: "\\[<",
        e: ">\\]"
      }, {
        cN: "attribute",
        b: "\\B('[A-Za-z])\\b",
        c: [a.BE]
      },
      a.CLCM, a.inherit(a.QSM, {
        i: null
      }), a.CNM
    ]
  }
});
hljs.registerLanguage("matlab", function(a) {
  var b = [a.CNM, {
    cN: "string",
    b: "'",
    e: "'",
    c: [a.BE, {
      b: "''"
    }]
  }];
  return {
    k: {
      keyword: "break case catch classdef continue else elseif end enumerated events for function global if methods otherwise parfor persistent properties return spmd switch try while",
      built_in: "sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i inf nan isnan isinf isfinite j why compan gallery hadamard hankel hilb invhilb magic pascal rosser toeplitz vander wilkinson"
    },
    i: '(//|"|#|/\\*|\\s+/\\w+)',
    c: [{
      cN: "function",
      bK: "function",
      e: "$",
      c: [a.UTM, {
        cN: "params",
        b: "\\(",
        e: "\\)"
      }, {
        cN: "params",
        b: "\\[",
        e: "\\]"
      }]
    }, {
      cN: "transposed_variable",
      b: "[a-zA-Z_][a-zA-Z_0-9]*('+[\\.']*|[\\.']+)",
      e: "",
      r: 0
    }, {
      cN: "matrix",
      b: "\\[",
      e: "\\]'*[\\.']*",
      c: b,
      r: 0
    }, {
      cN: "cell",
      b: "\\{",
      e: "\\}'*[\\.']*",
      c: b,
      i: /:/
    }, {
      cN: "comment",
      b: "\\%",
      e: "$"
    }].concat(b)
  }
});
hljs.registerLanguage("applescript", function(a) {
  var b = a.inherit(a.QSM, {
    i: ""
  });
  var d = {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: ["self", a.CNM, b]
  };
  var c = [{
      cN: "comment",
      b: "--",
      e: "$",
    }, {
      cN: "comment",
      b: "\\(\\*",
      e: "\\*\\)",
      c: ["self", {
        b: "--",
        e: "$"
      }]
    },
    a.HCM
  ];
  return {
    k: {
      keyword: "about above after against and around as at back before beginning behind below beneath beside between but by considering contain contains continue copy div does eighth else end equal equals error every exit fifth first for fourth from front get given global if ignoring in into is it its last local me middle mod my ninth not of on onto or over prop property put ref reference repeat returning script second set seventh since sixth some tell tenth that the then third through thru timeout times to transaction try until where while whose with without",
      constant: "AppleScript false linefeed return pi quote result space tab true",
      type: "alias application boolean class constant date file integer list number real record string text",
      command: "activate beep count delay launch log offset read round run say summarize write",
      property: "character characters contents day frontmost id item length month name paragraph paragraphs rest reverse running time version weekday word words year"
    },
    c: [b, a.CNM, {
      cN: "type",
      b: "\\bPOSIX file\\b"
    }, {
      cN: "command",
      b: "\\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog))\\b|^\\s*return\\b"
    }, {
      cN: "constant",
      b: "\\b(text item delimiters|current application|missing value)\\b"
    }, {
      cN: "keyword",
      b: "\\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference))\\b"
    }, {
      cN: "property",
      b: "\\b(POSIX path|(date|time) string|quoted form)\\b"
    }, {
      cN: "function_start",
      bK: "on",
      i: "[${=;\\n]",
      c: [a.UTM, d]
    }].concat(c),
    i: "//"
  }
});
hljs.registerLanguage("delphi", function(b) {
  var a = "exports register file shl array record property for mod while set ally label uses raise not stored class safecall var interface or private static exit index inherited to else stdcall override shr asm far resourcestring finalization packed virtual out and protected library do xorwrite goto near function end div overload object unit begin string on inline repeat until destructor write message program with read initialization except default nil if case cdecl in downto threadvar of try pascal const external constructor type public then implementation finally published procedure";
  var e = {
    cN: "comment",
    v: [{
      b: /\{/,
      e: /\}/,
      r: 0
    }, {
      b: /\(\*/,
      e: /\*\)/,
      r: 10
    }]
  };
  var c = {
    cN: "string",
    b: /'/,
    e: /'/,
    c: [{
      b: /''/
    }]
  };
  var d = {
    cN: "string",
    b: /(#\d+)+/
  };
  var f = {
    b: b.IR + "\\s*=\\s*class\\s*\\(",
    rB: true,
    c: [b.TM]
  };
  var g = {
    cN: "function",
    bK: "function constructor destructor procedure",
    e: /[:;]/,
    k: "function constructor|10 destructor|10 procedure|10",
    c: [b.TM, {
        cN: "params",
        b: /\(/,
        e: /\)/,
        k: a,
        c: [c, d]
      },
      e
    ]
  };
  return {
    cI: true,
    k: a,
    i: /("|\$[G-Zg-z]|\/\*|<\/)/,
    c: [e, b.CLCM, c, d, b.NM, f, g]
  }
});
hljs.registerLanguage("cpp", function(a) {
  var b = {
    keyword: "false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginary",
    built_in: "std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf"
  };
  return {
    aliases: ["c"],
    k: b,
    i: "</",
    c: [a.CLCM, a.CBLCLM, a.QSM, {
        cN: "string",
        b: "'\\\\?.",
        e: "'",
        i: "."
      }, {
        cN: "number",
        b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
      },
      a.CNM, {
        cN: "preprocessor",
        b: "#",
        e: "$",
        c: [{
            b: "include\\s*<",
            e: ">",
            i: "\\n"
          },
          a.CLCM
        ]
      }, {
        cN: "stl_container",
        b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
        e: ">",
        k: b,
        r: 10,
        c: ["self"]
      }
    ]
  }
});
hljs.registerLanguage("json", function(a) {
  var e = {
    literal: "true false null"
  };
  var d = [a.QSM, a.CNM];
  var c = {
    cN: "value",
    e: ",",
    eW: true,
    eE: true,
    c: d,
    k: e
  };
  var b = {
    b: "{",
    e: "}",
    c: [{
      cN: "attribute",
      b: '\\s*"',
      e: '"\\s*:\\s*',
      eB: true,
      eE: true,
      c: [a.BE],
      i: "\\n",
      starts: c
    }],
    i: "\\S"
  };
  var f = {
    b: "\\[",
    e: "\\]",
    c: [a.inherit(c, {
      cN: null
    })],
    i: "\\S"
  };
  d.splice(d.length, 0, b, f);
  return {
    c: d,
    k: e,
    i: "\\S"
  }
});
hljs.registerLanguage("perl", function(c) {
  var d = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when";
  var f = {
    cN: "subst",
    b: "[$@]\\{",
    e: "\\}",
    k: d
  };
  var g = {
    b: "->{",
    e: "}"
  };
  var a = {
    cN: "variable",
    v: [{
      b: /\$\d/
    }, {
      b: /[\$\%\@\*](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/
    }, {
      b: /[\$\%\@\*][^\s\w{]/,
      r: 0
    }]
  };
  var e = {
    cN: "comment",
    b: "^(__END__|__DATA__)",
    e: "\\n$",
    r: 5
  };
  var h = [c.BE, f, a];
  var b = [a, c.HCM, e, {
      cN: "comment",
      b: "^\\=\\w",
      e: "\\=cut",
      eW: true
    },
    g, {
      cN: "string",
      c: h,
      v: [{
        b: "q[qwxr]?\\s*\\(",
        e: "\\)",
        r: 5
      }, {
        b: "q[qwxr]?\\s*\\[",
        e: "\\]",
        r: 5
      }, {
        b: "q[qwxr]?\\s*\\{",
        e: "\\}",
        r: 5
      }, {
        b: "q[qwxr]?\\s*\\|",
        e: "\\|",
        r: 5
      }, {
        b: "q[qwxr]?\\s*\\<",
        e: "\\>",
        r: 5
      }, {
        b: "qw\\s+q",
        e: "q",
        r: 5
      }, {
        b: "'",
        e: "'",
        c: [c.BE]
      }, {
        b: '"',
        e: '"'
      }, {
        b: "`",
        e: "`",
        c: [c.BE]
      }, {
        b: "{\\w+}",
        c: [],
        r: 0
      }, {
        b: "-?\\w+\\s*\\=\\>",
        c: [],
        r: 0
      }]
    }, {
      cN: "number",
      b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
      r: 0
    }, {
      b: "(\\/\\/|" + c.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
      k: "split return print reverse grep",
      r: 0,
      c: [c.HCM, e, {
        cN: "regexp",
        b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
        r: 10
      }, {
        cN: "regexp",
        b: "(m|qr)?/",
        e: "/[a-z]*",
        c: [c.BE],
        r: 0
      }]
    }, {
      cN: "sub",
      bK: "sub",
      e: "(\\s*\\(.*?\\))?[;{]",
      r: 5
    }, {
      cN: "operator",
      b: "-\\w\\b",
      r: 0
    }
  ];
  f.c = b;
  g.c = b;
  return {
    k: d,
    c: b
  }
});
hljs.registerLanguage("markdown", function(a) {
  return {
    c: [{
      cN: "header",
      v: [{
        b: "^#{1,6}",
        e: "$"
      }, {
        b: "^.+?\\n[=-]{2,}$"
      }]
    }, {
      b: "<",
      e: ">",
      sL: "xml",
      r: 0
    }, {
      cN: "bullet",
      b: "^([*+-]|(\\d+\\.))\\s+"
    }, {
      cN: "strong",
      b: "[*_]{2}.+?[*_]{2}"
    }, {
      cN: "emphasis",
      v: [{
        b: "\\*.+?\\*"
      }, {
        b: "_.+?_",
        r: 0
      }]
    }, {
      cN: "blockquote",
      b: "^>\\s+",
      e: "$"
    }, {
      cN: "code",
      v: [{
        b: "`.+?`"
      }, {
        b: "^( {4}|\t)",
        e: "$",
        r: 0
      }]
    }, {
      cN: "horizontal_rule",
      b: "^[-\\*]{3,}",
      e: "$"
    }, {
      b: "\\[.+?\\][\\(\\[].+?[\\)\\]]",
      rB: true,
      c: [{
        cN: "link_label",
        b: "\\[",
        e: "\\]",
        eB: true,
        rE: true,
        r: 0
      }, {
        cN: "link_url",
        b: "\\]\\(",
        e: "\\)",
        eB: true,
        eE: true
      }, {
        cN: "link_reference",
        b: "\\]\\[",
        e: "\\]",
        eB: true,
        eE: true,
      }],
      r: 10
    }, {
      b: "^\\[.+\\]:",
      e: "$",
      rB: true,
      c: [{
        cN: "link_reference",
        b: "\\[",
        e: "\\]",
        eB: true,
        eE: true
      }, {
        cN: "link_url",
        b: "\\s",
        e: "$"
      }]
    }]
  }
});
hljs.registerLanguage("ocaml", function(a) {
  return {
    k: {
      keyword: "and as assert asr begin class constraint do done downto else end exception external false for fun function functor if in include inherit initializer land lazy let lor lsl lsr lxor match method mod module mutable new object of open or private rec ref sig struct then to true try type val virtual when while with parser value",
      built_in: "bool char float int list unit array exn option int32 int64 nativeint format4 format6 lazy_t in_channel out_channel string",
    },
    i: /\/\//,
    c: [{
        cN: "string",
        b: '"""',
        e: '"""'
      }, {
        cN: "comment",
        b: "\\(\\*",
        e: "\\*\\)",
        c: ["self"]
      }, {
        cN: "class",
        bK: "type",
        e: "\\(|=|$",
        c: [a.UTM]
      }, {
        cN: "annotation",
        b: "\\[<",
        e: ">\\]"
      },
      a.CBLCLM, a.inherit(a.ASM, {
        i: null
      }), a.inherit(a.QSM, {
        i: null
      }), a.CNM
    ]
  }
});
hljs.registerLanguage("d", function(x) {
  var b = {
    keyword: "abstract alias align asm assert auto body break byte case cast catch class const continue debug default delete deprecated do else enum export extern final finally for foreach foreach_reverse|10 goto if immutable import in inout int interface invariant is lazy macro mixin module new nothrow out override package pragma private protected public pure ref return scope shared static struct super switch synchronized template this throw try typedef typeid typeof union unittest version void volatile while with __FILE__ __LINE__ __gshared|10 __thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__",
    built_in: "bool cdouble cent cfloat char creal dchar delegate double dstring float function idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar wstring",
    literal: "false null true"
  };
  var c = "(0|[1-9][\\d_]*)",
    q = "(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)",
    h = "0[bB][01_]+",
    v = "([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)",
    y = "0[xX]" + v,
    p = "([eE][+-]?" + q + ")",
    o = "(" + q + "(\\.\\d*|" + p + ")|\\d+\\." + q + q + "|\\." + c + p + "?)",
    k = "(0[xX](" + v + "\\." + v + "|\\.?" + v + ")[pP][+-]?" + q + ")",
    l = "(" + c + "|" + h + "|" + y + ")",
    n = "(" + k + "|" + o + ")";
  var z = "\\\\(['\"\\?\\\\abfnrtv]|u[\\dA-Fa-f]{4}|[0-7]{1,3}|x[\\dA-Fa-f]{2}|U[\\dA-Fa-f]{8})|&[a-zA-Z\\d]{2,};";
  var m = {
    cN: "number",
    b: "\\b" + l + "(L|u|U|Lu|LU|uL|UL)?",
    r: 0
  };
  var j = {
    cN: "number",
    b: "\\b(" + n + "([fF]|L|i|[fF]i|Li)?|" + l + "(i|[fF]i|Li))",
    r: 0
  };
  var s = {
    cN: "string",
    b: "'(" + z + "|.)",
    e: "'",
    i: "."
  };
  var r = {
    b: z,
    r: 0
  };
  var w = {
    cN: "string",
    b: '"',
    c: [r],
    e: '"[cwd]?'
  };
  var f = {
    cN: "string",
    b: '[rq]"',
    e: '"[cwd]?',
    r: 5
  };
  var u = {
    cN: "string",
    b: "`",
    e: "`[cwd]?"
  };
  var i = {
    cN: "string",
    b: 'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?',
    r: 10
  };
  var t = {
    cN: "string",
    b: 'q"\\{',
    e: '\\}"'
  };
  var e = {
    cN: "shebang",
    b: "^#!",
    e: "$",
    r: 5
  };
  var g = {
    cN: "preprocessor",
    b: "#(line)",
    e: "$",
    r: 5
  };
  var d = {
    cN: "keyword",
    b: "@[a-zA-Z_][a-zA-Z_\\d]*"
  };
  var a = {
    cN: "comment",
    b: "\\/\\+",
    c: ["self"],
    e: "\\+\\/",
    r: 10
  };
  return {
    l: x.UIR,
    k: b,
    c: [x.CLCM, x.CBLCLM, a, i, w, f, u, t, j, m, s, e, g, d]
  }
});
hljs.registerLanguage("coffeescript", function(c) {
  var b = {
    keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
    literal: "true false null undefined yes no on off",
    reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",
    built_in: "npm require console print module exports global window document"
  };
  var a = "[A-Za-z$_][0-9A-Za-z$_]*";
  var f = c.inherit(c.TM, {
    b: a
  });
  var e = {
    cN: "subst",
    b: /#\{/,
    e: /}/,
    k: b
  };
  var d = [c.BNM, c.inherit(c.CNM, {
    starts: {
      e: "(\\s*/)?",
      r: 0
    }
  }), {
    cN: "string",
    v: [{
      b: /'''/,
      e: /'''/,
      c: [c.BE]
    }, {
      b: /'/,
      e: /'/,
      c: [c.BE]
    }, {
      b: /"""/,
      e: /"""/,
      c: [c.BE, e]
    }, {
      b: /"/,
      e: /"/,
      c: [c.BE, e]
    }]
  }, {
    cN: "regexp",
    v: [{
      b: "///",
      e: "///",
      c: [e, c.HCM]
    }, {
      b: "//[gim]*",
      r: 0
    }, {
      b: "/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)"
    }]
  }, {
    cN: "property",
    b: "@" + a
  }, {
    b: "`",
    e: "`",
    eB: true,
    eE: true,
    sL: "javascript"
  }];
  e.c = d;
  return {
    k: b,
    c: d.concat([{
        cN: "comment",
        b: "###",
        e: "###"
      },
      c.HCM, {
        cN: "function",
        b: "(" + a + "\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>",
        e: "[-=]>",
        rB: true,
        c: [f, {
          cN: "params",
          b: "\\(",
          rB: true,
          c: [{
            b: /\(/,
            e: /\)/,
            k: b,
            c: ["self"].concat(d)
          }]
        }]
      }, {
        cN: "class",
        bK: "class",
        e: "$",
        i: /[:="\[\]]/,
        c: [{
            bK: "extends",
            eW: true,
            i: /[:="\[\]]/,
            c: [f]
          },
          f
        ]
      }, {
        cN: "attribute",
        b: a + ":",
        e: ":",
        rB: true,
        eE: true,
        r: 0
      }
    ])
  }
});
hljs.registerLanguage("lua", function(b) {
  var a = "\\[=*\\[";
  var e = "\\]=*\\]";
  var c = {
    b: a,
    e: e,
    c: ["self"]
  };
  var d = [{
    cN: "comment",
    b: "--(?!" + a + ")",
    e: "$"
  }, {
    cN: "comment",
    b: "--" + a,
    e: e,
    c: [c],
    r: 10
  }];
  return {
    l: b.UIR,
    k: {
      keyword: "and break do else elseif end false for if in local nil not or repeat return then true until while",
      built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
    },
    c: d.concat([{
        cN: "function",
        bK: "function",
        e: "\\)",
        c: [b.inherit(b.TM, {
          b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
        }), {
          cN: "params",
          b: "\\(",
          eW: true,
          c: d
        }].concat(d)
      },
      b.CNM, b.ASM, b.QSM, {
        cN: "string",
        b: a,
        e: e,
        c: [c],
        r: 10
      }
    ])
  }
});
hljs.registerLanguage("makefile", function(a) {
  var b = {
    cN: "variable",
    b: /\$\(/,
    e: /\)/,
    c: [a.BE]
  };
  return {
    c: [a.HCM, {
      b: /^\w+\s*\W*=/,
      rB: true,
      r: 0,
      starts: {
        cN: "constant",
        e: /\s*\W*=/,
        eE: true,
        starts: {
          e: /$/,
          r: 0,
          c: [b],
        }
      }
    }, {
      cN: "title",
      b: /^[\w]+:\s*$/
    }, {
      cN: "phony",
      b: /^\.PHONY:/,
      e: /$/,
      k: ".PHONY",
      l: /[\.\w]+/
    }, {
      b: /^\t+/,
      e: /$/,
      c: [a.QSM, b]
    }]
  }
});
hljs.registerLanguage("rsl", function(a) {
  return {
    k: {
      keyword: "float color point normal vector matrix while for if do return else break extern continue",
      built_in: "abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise clamp comp concat cos degrees depth Deriv diffuse distance Du Dv environment exp faceforward filterstep floor format fresnel incident length lightsource log match max min mod noise normalize ntransform opposite option phong pnoise pow printf ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan texture textureinfo trace transform vtransform xcomp ycomp zcomp"
    },
    i: "</",
    c: [a.CLCM, a.CBLCLM, a.QSM, a.ASM, a.CNM, {
      cN: "preprocessor",
      b: "#",
      e: "$"
    }, {
      cN: "shader",
      bK: "surface displacement light volume imager",
      e: "\\("
    }, {
      cN: "shading",
      bK: "illuminate illuminance gather",
      e: "\\("
    }]
  }
});
hljs.registerLanguage("vbscript", function(a) {
  return {
    cI: true,
    k: {
      keyword: "call class const dim do loop erase execute executeglobal exit for each next function if then else on error option explicit new private property let get public randomize redim rem select case set stop sub while wend with end to elseif is or xor and not class_initialize class_terminate default preserve in me byval byref step resume goto",
      built_in: "lcase month vartype instrrev ubound setlocale getobject rgb getref string weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency conversions csng timevalue second year space abs clng timeserial fixs len asc isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion scriptengine split scriptengineminorversion cint sin datepart ltrim sqr scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw chrw regexp server response request cstr err",
      literal: "true false null nothing empty"
    },
    i: "//",
    c: [a.inherit(a.QSM, {
        c: [{
          b: '""'
        }]
      }), {
        cN: "comment",
        b: /'/,
        e: /$/,
        r: 0
      },
      a.CNM
    ]
  }
});
hljs.registerLanguage("go", function(a) {
  var b = {
    keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer",
    constant: "true false iota nil",
    typename: "bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
    built_in: "append cap close complex copy imag len make new panic print println real recover delete"
  };
  return {
    aliases: ["golang"],
    k: b,
    i: "</",
    c: [a.CLCM, a.CBLCLM, a.QSM, {
        cN: "string",
        b: "'",
        e: "[^\\\\]'"
      }, {
        cN: "string",
        b: "`",
        e: "`"
      }, {
        cN: "number",
        b: "[^a-zA-Z_0-9](\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?",
        r: 0
      },
      a.CNM
    ]
  }
});
hljs.registerLanguage("axapta", function(a) {
  return {
    k: "false int abstract private char boolean static null if for true while long throw finally protected final return void enum else break new catch byte super case short default double public try this switch continue reverse firstfast firstonly forupdate nofetch sum avg minof maxof count order group by asc desc index hint like dispaly edit client server ttsbegin ttscommit str real date container anytype common div mod",
    c: [a.CLCM, a.CBLCLM, a.ASM, a.QSM, a.CNM, {
      cN: "preprocessor",
      b: "#",
      e: "$"
    }, {
      cN: "class",
      bK: "class interface",
      e: "{",
      i: ":",
      c: [{
          cN: "inheritance",
          bK: "extends implements",
          r: 10
        },
        a.UTM
      ]
    }]
  }
});
hljs.registerLanguage("vala", function(a) {
  return {
    k: {
      keyword: "char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 uint16 uint32 uint64 float double bool struct enum string void weak unowned owned async signal static abstract interface override while do for foreach else switch case break default return try catch public private protected internal using new this get set const stdout stdin stderr var",
      built_in: "DBus GLib CCode Gee Object",
      literal: "false true null"
    },
    c: [{
        cN: "class",
        bK: "class interface delegate namespace",
        e: "{",
        i: "[^,:\\n\\s\\.]",
        c: [a.UTM]
      },
      a.CLCM, a.CBLCLM, {
        cN: "string",
        b: '"""',
        e: '"""',
        r: 5
      },
      a.ASM, a.QSM, a.CNM, {
        cN: "preprocessor",
        b: "^#",
        e: "$",
        r: 2
      }, {
        cN: "constant",
        b: " [A-Z_]+ ",
        r: 0
      }
    ]
  }
});
hljs.registerLanguage("erlang", function(i) {
  var c = "[a-z'][a-zA-Z0-9_']*";
  var o = "(" + c + ":" + c + "|" + c + ")";
  var f = {
    keyword: "after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun let not of orelse|10 query receive rem try when xor",
    literal: "false true"
  };
  var l = {
    cN: "comment",
    b: "%",
    e: "$",
    r: 0
  };
  var e = {
    cN: "number",
    b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
    r: 0
  };
  var g = {
    b: "fun\\s+" + c + "/\\d+"
  };
  var n = {
    b: o + "\\(",
    e: "\\)",
    rB: true,
    r: 0,
    c: [{
      cN: "function_name",
      b: o,
      r: 0
    }, {
      b: "\\(",
      e: "\\)",
      eW: true,
      rE: true,
      r: 0
    }]
  };
  var h = {
    cN: "tuple",
    b: "{",
    e: "}",
    r: 0
  };
  var a = {
    cN: "variable",
    b: "\\b_([A-Z][A-Za-z0-9_]*)?",
    r: 0
  };
  var m = {
    cN: "variable",
    b: "[A-Z][a-zA-Z0-9_]*",
    r: 0
  };
  var b = {
    b: "#" + i.UIR,
    r: 0,
    rB: true,
    c: [{
      cN: "record_name",
      b: "#" + i.UIR,
      r: 0
    }, {
      b: "{",
      e: "}",
      r: 0
    }]
  };
  var k = {
    bK: "fun receive if try case",
    e: "end",
    k: f
  };
  k.c = [l, g, i.inherit(i.ASM, {
    cN: ""
  }), k, n, i.QSM, e, h, a, m, b];
  var j = [l, g, k, n, i.QSM, e, h, a, m, b];
  n.c[1].c = j;
  h.c = j;
  b.c[1].c = j;
  var d = {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: j
  };
  return {
    k: f,
    i: "(</|\\*=|\\+=|-=|/=|/\\*|\\*/|\\(\\*|\\*\\))",
    c: [{
        cN: "function",
        b: "^" + c + "\\s*\\(",
        e: "->",
        rB: true,
        i: "\\(|#|//|/\\*|\\\\|:|;",
        c: [d, i.inherit(i.TM, {
          b: c
        })],
        starts: {
          e: ";|\\.",
          k: f,
          c: j
        }
      },
      l, {
        cN: "pp",
        b: "^-",
        e: "\\.",
        r: 0,
        eE: true,
        rB: true,
        l: "-" + i.IR,
        k: "-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn -import -include -include_lib -compile -define -else -endif -file -behaviour -behavior",
        c: [d]
      },
      e, i.QSM, b, a, m, h
    ]
  }
});
hljs.registerLanguage("sql", function(a) {
  return {
    cI: true,
    i: /[<>]/,
    c: [{
        cN: "operator",
        b: "\\b(begin|end|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant|merge)\\b(?!:)",
        e: ";",
        eW: true,
        k: {
          keyword: "all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma exists number trigger if before after each row merge matched database",
          aggregate: "count sum min max avg"
        },
        c: [{
            cN: "string",
            b: "'",
            e: "'",
            c: [a.BE, {
              b: "''"
            }]
          }, {
            cN: "string",
            b: '"',
            e: '"',
            c: [a.BE, {
              b: '""'
            }]
          }, {
            cN: "string",
            b: "`",
            e: "`",
            c: [a.BE]
          },
          a.CNM
        ]
      },
      a.CBLCLM, {
        cN: "comment",
        b: "--",
        e: "$"
      }
    ]
  }
});
hljs.registerLanguage("mizar", function(a) {
  return {
    k: ["environ vocabularies notations constructors definitions registrations theorems schemes requirements", "begin end definition registration cluster existence pred func defpred deffunc theorem proof", "let take assume then thus hence ex for st holds consider reconsider such that and in provided of as from", "be being by means equals implies iff redefine define now not or attr is mode suppose per cases set", "thesis contradiction scheme reserve struct", "correctness compatibility coherence symmetry assymetry reflexivity irreflexivity", "connectedness uniqueness commutativity idempotence involutiveness projectivity"].join(" "),
    c: [{
      cN: "comment",
      b: "::",
      e: "$"
    }]
  }
});
hljs.registerLanguage("lasso", function(d) {
  var b = "[a-zA-Z_][a-zA-Z0-9_.]*";
  var i = "<\\?(lasso(script)?|=)";
  var c = "\\]|\\?>";
  var g = {
    literal: "true false none minimal full all void and or not bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft",
    built_in: "array date decimal duration integer map pair string tag xml null bytes list queue set stack staticarray tie local var variable global data self inherited",
    keyword: "error_code error_msg error_pop error_push error_reset cache database_names database_schemanames database_tablenames define_tag define_type email_batch encode_set html_comment handle handle_error header if inline iterate ljax_target link link_currentaction link_currentgroup link_currentrecord link_detail link_firstgroup link_firstrecord link_lastgroup link_lastrecord link_nextgroup link_nextrecord link_prevgroup link_prevrecord log loop namespace_using output_none portal private protect records referer referrer repeating resultset rows search_args search_arguments select sort_args sort_arguments thread_atomic value_list while abort case else if_empty if_false if_null if_true loop_abort loop_continue loop_count params params_up return return_value run_children soap_definetag soap_lastrequest soap_lastresponse tag_name ascending average by define descending do equals frozen group handle_failure import in into join let match max min on order parent protected provide public require returnhome skip split_thread sum take thread to trait type where with yield yieldhome"
  };
  var a = {
    cN: "comment",
    b: "<!--",
    e: "-->",
    r: 0
  };
  var j = {
    cN: "preprocessor",
    b: "\\[noprocess\\]",
    starts: {
      cN: "markup",
      e: "\\[/noprocess\\]",
      rE: true,
      c: [a]
    }
  };
  var e = {
    cN: "preprocessor",
    b: "\\[/noprocess|" + i
  };
  var h = {
    cN: "variable",
    b: "'" + b + "'"
  };
  var f = [d.CLCM, {
      cN: "javadoc",
      b: "/\\*\\*!",
      e: "\\*/"
    },
    d.CBLCLM, d.inherit(d.CNM, {
      b: d.CNR + "|-?(infinity|nan)\\b"
    }), d.inherit(d.ASM, {
      i: null
    }), d.inherit(d.QSM, {
      i: null
    }), {
      cN: "string",
      b: "`",
      e: "`"
    }, {
      cN: "variable",
      v: [{
        b: "[#$]" + b
      }, {
        b: "#",
        e: "\\d+",
        i: "\\W"
      }]
    }, {
      cN: "tag",
      b: "::\\s*",
      e: b,
      i: "\\W"
    }, {
      cN: "attribute",
      b: "\\.\\.\\.|-" + d.UIR
    }, {
      cN: "subst",
      v: [{
        b: "->\\s*",
        c: [h]
      }, {
        b: ":=|/(?!\\w)=?|[-+*%=<>&|!?\\\\]+",
        r: 0
      }]
    }, {
      cN: "built_in",
      b: "\\.\\.?",
      r: 0,
      c: [h]
    }, {
      cN: "class",
      bK: "define",
      rE: true,
      e: "\\(|=>",
      c: [d.inherit(d.TM, {
        b: d.UIR + "(=(?!>))?"
      })]
    }
  ];
  return {
    aliases: ["ls", "lassoscript"],
    cI: true,
    l: b + "|&[lg]t;",
    k: g,
    c: [{
        cN: "preprocessor",
        b: c,
        r: 0,
        starts: {
          cN: "markup",
          e: "\\[|" + i,
          rE: true,
          r: 0,
          c: [a]
        }
      },
      j, e, {
        cN: "preprocessor",
        b: "\\[no_square_brackets",
        starts: {
          e: "\\[/no_square_brackets\\]",
          l: b + "|&[lg]t;",
          k: g,
          c: [{
              cN: "preprocessor",
              b: c,
              r: 0,
              starts: {
                cN: "markup",
                e: i,
                rE: true,
                c: [a]
              }
            },
            j, e
          ].concat(f)
        }
      }, {
        cN: "preprocessor",
        b: "\\[",
        r: 0
      }, {
        cN: "shebang",
        b: "^#!.+lasso9\\b",
        r: 10
      }
    ].concat(f)
  }
});
hljs.registerLanguage("r", function(a) {
  var b = "([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*";
  return {
    c: [a.HCM, {
      b: b,
      l: b,
      k: {
        keyword: "function if in break next repeat else for return switch while try tryCatch|10 stop warning require library attach detach source setMethod setGeneric setGroupGeneric setClass ...|10",
        literal: "NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10"
      },
      r: 0
    }, {
      cN: "number",
      b: "0[xX][0-9a-fA-F]+[Li]?\\b",
      r: 0
    }, {
      cN: "number",
      b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
      r: 0
    }, {
      cN: "number",
      b: "\\d+\\.(?!\\d)(?:i\\b)?",
      r: 0
    }, {
      cN: "number",
      b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
      r: 0
    }, {
      cN: "number",
      b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
      r: 0
    }, {
      b: "`",
      e: "`",
      r: 0
    }, {
      cN: "string",
      c: [a.BE],
      v: [{
        b: '"',
        e: '"'
      }, {
        b: "'",
        e: "'"
      }]
    }]
  }
});
hljs.registerLanguage("scala", function(a) {
  var c = {
    cN: "annotation",
    b: "@[A-Za-z]+"
  };
  var b = {
    cN: "string",
    b: 'u?r?"""',
    e: '"""',
    r: 10
  };
  return {
    k: "type yield lazy override def with val var false true sealed abstract private trait object null if for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws",
    c: [{
        cN: "javadoc",
        b: "/\\*\\*",
        e: "\\*/",
        c: [{
          cN: "javadoctag",
          b: "@[A-Za-z]+"
        }],
        r: 10
      },
      a.CLCM, a.CBLCLM, b, a.ASM, a.QSM, {
        cN: "class",
        b: "((case )?class |object |trait )",
        e: "({|$)",
        i: ":",
        k: "case class trait object",
        c: [{
            bK: "extends with",
            r: 10
          },
          a.UTM, {
            cN: "params",
            b: "\\(",
            e: "\\)",
            c: [a.ASM, a.QSM, b, c]
          }
        ]
      },
      a.CNM, c
    ]
  }
});
hljs.registerLanguage("livecodeserver", function(a) {
  var e = {
    cN: "variable",
    b: "\\b[gtps][A-Z]+[A-Za-z0-9_\\-]*\\b|\\$_[A-Z]+",
    r: 0
  };
  var b = {
    cN: "comment",
    e: "$",
    v: [a.CBLCLM, a.HCM, {
      b: "--",
    }, {
      b: "[^:]//",
    }]
  };
  var d = a.inherit(a.TM, {
    v: [{
      b: "\\b_*rig[A-Z]+[A-Za-z0-9_\\-]*"
    }, {
      b: "\\b_[a-z0-9\\-]+"
    }]
  });
  var c = a.inherit(a.TM, {
    b: "\\b([A-Za-z0-9_\\-]+)\\b"
  });
  return {
    cI: false,
    k: {
      keyword: "after byte bytes english the until http forever descending using line real8 with seventh for stdout finally element word fourth before black ninth sixth characters chars stderr uInt1 uInt1s uInt2 uInt2s stdin string lines relative rel any fifth items from middle mid at else of catch then third it file milliseconds seconds second secs sec int1 int1s int4 int4s internet int2 int2s normal text item last long detailed effective uInt4 uInt4s repeat end repeat URL in try into switch to words https token binfile each tenth as ticks tick system real4 by dateItems without char character ascending eighth whole dateTime numeric short first ftp integer abbreviated abbr abbrev private case while if",
      constant: "SIX TEN FORMFEED NINE ZERO NONE SPACE FOUR FALSE COLON CRLF PI COMMA ENDOFFILE EOF EIGHT FIVE QUOTE EMPTY ONE TRUE RETURN CR LINEFEED RIGHT BACKSLASH NULL SEVEN TAB THREE TWO six ten formfeed nine zero none space four false colon crlf pi comma endoffile eof eight five quote empty one true return cr linefeed right backslash null seven tab three two RIVERSION RISTATE FILE_READ_MODE FILE_WRITE_MODE FILE_WRITE_MODE DIR_WRITE_MODE FILE_READ_UMASK FILE_WRITE_UMASK DIR_READ_UMASK DIR_WRITE_UMASK",
      operator: "div mod wrap and or bitAnd bitNot bitOr bitXor among not in a an within contains ends with begins the keys of keys",
      built_in: "put abs acos aliasReference annuity arrayDecode arrayEncode asin atan atan2 average avg base64Decode base64Encode baseConvert binaryDecode binaryEncode byteToNum cachedURL cachedURLs charToNum cipherNames commandNames compound compress constantNames cos date dateFormat decompress directories diskSpace DNSServers exp exp1 exp2 exp10 extents files flushEvents folders format functionNames global globals hasMemory hostAddress hostAddressToName hostName hostNameToAddress isNumber ISOToMac itemOffset keys len length libURLErrorData libUrlFormData libURLftpCommand libURLLastHTTPHeaders libURLLastRHHeaders libUrlMultipartFormAddPart libUrlMultipartFormData libURLVersion lineOffset ln ln1 localNames log log2 log10 longFilePath lower macToISO matchChunk matchText matrixMultiply max md5Digest median merge millisec millisecs millisecond milliseconds min monthNames num number numToByte numToChar offset open openfiles openProcesses openProcessIDs openSockets paramCount param params peerAddress pendingMessages platform processID random randomBytes replaceText result revCreateXMLTree revCreateXMLTreeFromFile revCurrentRecord revCurrentRecordIsFirst revCurrentRecordIsLast revDatabaseColumnCount revDatabaseColumnIsNull revDatabaseColumnLengths revDatabaseColumnNames revDatabaseColumnNamed revDatabaseColumnNumbered revDatabaseColumnTypes revDatabaseConnectResult revDatabaseCursors revDatabaseID revDatabaseTableNames revDatabaseType revDataFromQuery revdb_closeCursor revdb_columnbynumber revdb_columncount revdb_columnisnull revdb_columnlengths revdb_columnnames revdb_columntypes revdb_commit revdb_connect revdb_connections revdb_connectionerr revdb_currentrecord revdb_cursorconnection revdb_cursorerr revdb_cursors revdb_dbtype revdb_disconnect revdb_execute revdb_iseof revdb_isbof revdb_movefirst revdb_movelast revdb_movenext revdb_moveprev revdb_query revdb_querylist revdb_recordcount revdb_rollback revdb_tablenames revGetDatabaseDriverPath revNumberOfRecords revOpenDatabase revOpenDatabases revQueryDatabase revQueryDatabaseBlob revQueryResult revQueryIsAtStart revQueryIsAtEnd revUnixFromMacPath revXMLAttribute revXMLAttributes revXMLAttributeValues revXMLChildContents revXMLChildNames revXMLFirstChild revXMLMatchingNode revXMLNextSibling revXMLNodeContents revXMLNumberOfChildren revXMLParent revXMLPreviousSibling revXMLRootNode revXMLRPC_CreateRequest revXMLRPC_Documents revXMLRPC_Error revXMLRPC_Execute revXMLRPC_GetHost revXMLRPC_GetMethod revXMLRPC_GetParam revXMLText revXMLRPC_GetParamCount revXMLRPC_GetParamNode revXMLRPC_GetParamType revXMLRPC_GetPath revXMLRPC_GetPort revXMLRPC_GetProtocol revXMLRPC_GetRequest revXMLRPC_GetResponse revXMLRPC_GetSocket revXMLTree revXMLTrees revXMLValidateDTD revZipDescribeItem revZipEnumerateItems revZipOpenArchives round sec secs seconds sha1Digest shell shortFilePath sin specialFolderPath sqrt standardDeviation statRound stdDev sum sysError systemVersion tan tempName tick ticks time to toLower toUpper transpose trunc uniDecode uniEncode upper URLDecode URLEncode URLStatus value variableNames version waitDepth weekdayNames wordOffset add breakpoint cancel clear local variable file word line folder directory URL close socket process combine constant convert create new alias folder directory decrypt delete variable word line folder directory URL dispatch divide do encrypt filter get include intersect kill libURLDownloadToFile libURLFollowHttpRedirects libURLftpUpload libURLftpUploadFile libURLresetAll libUrlSetAuthCallback libURLSetCustomHTTPHeaders libUrlSetExpect100 libURLSetFTPListCommand libURLSetFTPMode libURLSetFTPStopTime libURLSetStatusCallback load multiply socket process post seek rel relative read from process rename replace require resetAll revAddXMLNode revAppendXML revCloseCursor revCloseDatabase revCommitDatabase revCopyFile revCopyFolder revCopyXMLNode revDeleteFolder revDeleteXMLNode revDeleteAllXMLTrees revDeleteXMLTree revExecuteSQL revGoURL revInsertXMLNode revMoveFolder revMoveToFirstRecord revMoveToLastRecord revMoveToNextRecord revMoveToPreviousRecord revMoveToRecord revMoveXMLNode revPutIntoXMLNode revRollBackDatabase revSetDatabaseDriverPath revSetXMLAttribute revXMLRPC_AddParam revXMLRPC_DeleteAllDocuments revXMLAddDTD revXMLRPC_Free revXMLRPC_FreeAll revXMLRPC_DeleteDocument revXMLRPC_DeleteParam revXMLRPC_SetHost revXMLRPC_SetMethod revXMLRPC_SetPort revXMLRPC_SetProtocol revXMLRPC_SetSocket revZipAddItemWithData revZipAddItemWithFile revZipAddUncompressedItemWithData revZipAddUncompressedItemWithFile revZipCancel revZipCloseArchive revZipDeleteItem revZipExtractItemToFile revZipExtractItemToVariable revZipSetProgressCallback revZipRenameItem revZipReplaceItemWithData revZipReplaceItemWithFile revZipOpenArchive send set sort split subtract union unload wait write"
    },
    c: [e, {
        cN: "keyword",
        b: "\\bend\\sif\\b"
      }, {
        cN: "function",
        bK: "function",
        e: "$",
        c: [e, c, a.ASM, a.QSM, a.BNM, a.CNM, d]
      }, {
        cN: "function",
        bK: "end",
        e: "$",
        c: [c, d]
      }, {
        cN: "command",
        bK: "command on",
        e: "$",
        c: [e, c, a.ASM, a.QSM, a.BNM, a.CNM, d]
      }, {
        cN: "command",
        bK: "end",
        e: "$",
        c: [c, d]
      }, {
        cN: "preprocessor",
        b: "<\\?rev|<\\?lc|<\\?livecode",
        r: 10
      }, {
        cN: "preprocessor",
        b: "<\\?"
      }, {
        cN: "preprocessor",
        b: "\\?>"
      },
      b, a.ASM, a.QSM, a.BNM, a.CNM, d
    ],
    i: ";$|^\\[|^="
  }
});
hljs.registerLanguage("profile", function(a) {
  return {
    c: [a.CNM, {
        cN: "built_in",
        b: "{",
        e: "}$",
        eB: true,
        eE: true,
        c: [a.ASM, a.QSM],
        r: 0
      }, {
        cN: "filename",
        b: "[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}",
        e: ":",
        eE: true
      }, {
        cN: "header",
        b: "(ncalls|tottime|cumtime)",
        e: "$",
        k: "ncalls tottime|10 cumtime|10 filename",
        r: 10
      }, {
        cN: "summary",
        b: "function calls",
        e: "$",
        c: [a.CNM],
        r: 10
      },
      a.ASM, a.QSM, {
        cN: "function",
        b: "\\(",
        e: "\\)$",
        c: [a.UTM],
        r: 0
      }
    ]
  }
});
hljs.registerLanguage("php", function(b) {
  var e = {
    cN: "variable",
    b: "\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*"
  };
  var a = {
    cN: "preprocessor",
    b: /<\?(php)?|\?>/
  };
  var c = {
    cN: "string",
    c: [b.BE, a],
    v: [{
        b: 'b"',
        e: '"'
      }, {
        b: "b'",
        e: "'"
      },
      b.inherit(b.ASM, {
        i: null
      }), b.inherit(b.QSM, {
        i: null
      })
    ]
  };
  var d = {
    v: [b.BNM, b.CNM]
  };
  return {
    cI: true,
    k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
    c: [b.CLCM, b.HCM, {
        cN: "comment",
        b: "/\\*",
        e: "\\*/",
        c: [{
            cN: "phpdoc",
            b: "\\s@[A-Za-z]+"
          },
          a
        ]
      }, {
        cN: "comment",
        b: "__halt_compiler.+?;",
        eW: true,
        k: "__halt_compiler",
        l: b.UIR
      }, {
        cN: "string",
        b: "<<<['\"]?\\w+['\"]?$",
        e: "^\\w+;",
        c: [b.BE]
      },
      a, e, {
        cN: "function",
        bK: "function",
        e: /[;{]/,
        i: "\\$|\\[|%",
        c: [b.UTM, {
          cN: "params",
          b: "\\(",
          e: "\\)",
          c: ["self", e, b.CBLCLM, c, d]
        }]
      }, {
        cN: "class",
        bK: "class interface",
        e: "{",
        i: /[:\(\$"]/,
        c: [{
            bK: "extends implements",
            r: 10
          },
          b.UTM
        ]
      }, {
        bK: "namespace",
        e: ";",
        i: /[\.']/,
        c: [b.UTM]
      }, {
        bK: "use",
        e: ";",
        c: [b.UTM]
      }, {
        b: "=>"
      },
      c, d
    ]
  }
});
hljs.registerLanguage("parser3", function(a) {
  return {
    sL: "xml",
    r: 0,
    c: [{
        cN: "comment",
        b: "^#",
        e: "$"
      }, {
        cN: "comment",
        b: "\\^rem{",
        e: "}",
        r: 10,
        c: [{
          b: "{",
          e: "}",
          c: ["self"]
        }]
      }, {
        cN: "preprocessor",
        b: "^@(?:BASE|USE|CLASS|OPTIONS)$",
        r: 10
      }, {
        cN: "title",
        b: "@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$"
      }, {
        cN: "variable",
        b: "\\$\\{?[\\w\\-\\.\\:]+\\}?"
      }, {
        cN: "keyword",
        b: "\\^[\\w\\-\\.\\:]+"
      }, {
        cN: "number",
        b: "\\^#[0-9a-fA-F]+"
      },
      a.CNM
    ]
  }
});
hljs.registerLanguage("actionscript", function(a) {
  var c = "[a-zA-Z_$][a-zA-Z0-9_$]*";
  var b = "([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)";
  var d = {
    cN: "rest_arg",
    b: "[.]{3}",
    e: c,
    r: 10
  };
  return {
    k: {
      keyword: "as break case catch class const continue default delete do dynamic each else extends final finally for function get if implements import in include instanceof interface internal is namespace native new override package private protected public return set static super switch this throw try typeof use var void while with",
      literal: "true false null undefined"
    },
    c: [a.ASM, a.QSM, a.CLCM, a.CBLCLM, a.CNM, {
      cN: "package",
      bK: "package",
      e: "{",
      c: [a.TM]
    }, {
      cN: "class",
      bK: "class interface",
      e: "{",
      c: [{
          bK: "extends implements"
        },
        a.TM
      ]
    }, {
      cN: "preprocessor",
      bK: "import include",
      e: ";"
    }, {
      cN: "function",
      bK: "function",
      e: "[{;]",
      i: "\\S",
      c: [a.TM, {
        cN: "params",
        b: "\\(",
        e: "\\)",
        c: [a.ASM, a.QSM, a.CLCM, a.CBLCLM, d]
      }, {
        cN: "type",
        b: ":",
        e: b,
        r: 10
      }]
    }]
  }
});
hljs.registerLanguage("nginx", function(c) {
  var b = {
    cN: "variable",
    v: [{
      b: /\$\d+/
    }, {
      b: /\$\{/,
      e: /}/
    }, {
      b: "[\\$\\@]" + c.UIR
    }]
  };
  var a = {
    eW: true,
    l: "[a-z/_]+",
    k: {
      built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
    },
    r: 0,
    i: "=>",
    c: [c.HCM, {
        cN: "string",
        c: [c.BE, b],
        v: [{
          b: /"/,
          e: /"/
        }, {
          b: /'/,
          e: /'/
        }]
      }, {
        cN: "url",
        b: "([a-z]+):/",
        e: "\\s",
        eW: true,
        eE: true
      }, {
        cN: "regexp",
        c: [c.BE, b],
        v: [{
          b: "\\s\\^",
          e: "\\s|{|;",
          rE: true
        }, {
          b: "~\\*?\\s+",
          e: "\\s|{|;",
          rE: true
        }, {
          b: "\\*(\\.[a-z\\-]+)+"
        }, {
          b: "([a-z\\-]+\\.)+\\*"
        }]
      }, {
        cN: "number",
        b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
      }, {
        cN: "number",
        b: "\\b\\d+[kKmMgGdshdwy]*\\b",
        r: 0
      },
      b
    ]
  };
  return {
    c: [c.HCM, {
      b: c.UIR + "\\s",
      e: ";|{",
      rB: true,
      c: [c.inherit(c.UTM, {
        starts: a
      })],
      r: 0
    }],
    i: "[^\\s\\}]"
  }
});
hljs.registerLanguage("vhdl", function(a) {
  return {
    cI: true,
    k: {
      keyword: "abs access after alias all and architecture array assert attribute begin block body buffer bus case component configuration constant context cover disconnect downto default else elsif end entity exit fairness file for force function generate generic group guarded if impure in inertial inout is label library linkage literal loop map mod nand new next nor not null of on open or others out package port postponed procedure process property protected pure range record register reject release rem report restrict restrict_guarantee return rol ror select sequence severity shared signal sla sll sra srl strong subtype then to transport type unaffected units until use variable vmode vprop vunit wait when while with xnor xor",
      typename: "boolean bit character severity_level integer time delay_length natural positive string bit_vector file_open_kind file_open_status std_ulogic std_ulogic_vector std_logic std_logic_vector unsigned signed boolean_vector integer_vector real_vector time_vector"
    },
    i: "{",
    c: [a.CBLCLM, {
        cN: "comment",
        b: "--",
        e: "$"
      },
      a.QSM, a.CNM, {
        cN: "literal",
        b: "'(U|X|0|1|Z|W|L|H|-)'",
        c: [a.BE]
      }, {
        cN: "attribute",
        b: "'[A-Za-z](_?[A-Za-z0-9])*",
        c: [a.BE]
      }
    ]
  }
});
hljs.registerLanguage("fix", function(a) {
  return {
    c: [{
      b: /[^\u2401\u0001]+/,
      e: /[\u2401\u0001]/,
      eE: true,
      rB: true,
      rE: false,
      c: [{
        b: /([^\u2401\u0001=]+)/,
        e: /=([^\u2401\u0001=]+)/,
        rE: true,
        rB: false,
        cN: "attribute"
      }, {
        b: /=/,
        e: /([\u2401\u0001])/,
        eE: true,
        eB: true,
        cN: "string"
      }]
    }],
    cI: true
  }
});
hljs.registerLanguage("diff", function(a) {
  return {
    c: [{
      cN: "chunk",
      r: 10,
      v: [{
        b: /^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/
      }, {
        b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
      }, {
        b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
      }]
    }, {
      cN: "header",
      v: [{
        b: /Index: /,
        e: /$/
      }, {
        b: /=====/,
        e: /=====$/
      }, {
        b: /^\-\-\-/,
        e: /$/
      }, {
        b: /^\*{3} /,
        e: /$/
      }, {
        b: /^\+\+\+/,
        e: /$/
      }, {
        b: /\*{5}/,
        e: /\*{5}$/
      }]
    }, {
      cN: "addition",
      b: "^\\+",
      e: "$"
    }, {
      cN: "deletion",
      b: "^\\-",
      e: "$"
    }, {
      cN: "change",
      b: "^\\!",
      e: "$"
    }]
  }
});
hljs.registerLanguage("smalltalk", function(a) {
  var b = "[a-z][a-zA-Z0-9_]*";
  var d = {
    cN: "char",
    b: "\\$.{1}"
  };
  var c = {
    cN: "symbol",
    b: "#" + a.UIR
  };
  return {
    k: "self super nil true false thisContext",
    c: [{
        cN: "comment",
        b: '"',
        e: '"'
      },
      a.ASM, {
        cN: "class",
        b: "\\b[A-Z][A-Za-z0-9_]*",
        r: 0
      }, {
        cN: "method",
        b: b + ":",
        r: 0
      },
      a.CNM, c, d, {
        cN: "localvars",
        b: "\\|[ ]*" + b + "([ ]+" + b + ")*[ ]*\\|",
        rB: true,
        e: /\|/,
        i: /\S/,
        c: [{
          b: "(\\|[ ]*)?" + b
        }]
      }, {
        cN: "array",
        b: "\\#\\(",
        e: "\\)",
        c: [a.ASM, d, a.CNM, c]
      }
    ]
  }
});
hljs.registerLanguage("clojure", function(l) {
  var e = {
    built_in: "def cond apply if-not if-let if not not= = &lt; < > &lt;= <= >= == + / * - rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit defmacro defn defn- macroexpand macroexpand-1 for dosync and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy defstruct first rest cons defprotocol cast coll deftype defrecord last butlast sigs reify second ffirst fnext nfirst nnext defmulti defmethod meta with-meta ns in-ns create-ns import refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize"
  };
  var f = "[a-zA-Z_0-9\\!\\.\\?\\-\\+\\*\\/\\<\\=\\>\\&\\#\\$';]+";
  var a = "[\\s:\\(\\{]+\\d+(\\.\\d+)?";
  var d = {
    cN: "number",
    b: a,
    r: 0
  };
  var j = l.inherit(l.QSM, {
    i: null
  });
  var o = {
    cN: "comment",
    b: ";",
    e: "$",
    r: 0
  };
  var n = {
    cN: "collection",
    b: "[\\[\\{]",
    e: "[\\]\\}]"
  };
  var c = {
    cN: "comment",
    b: "\\^" + f
  };
  var b = {
    cN: "comment",
    b: "\\^\\{",
    e: "\\}"
  };
  var h = {
    cN: "attribute",
    b: "[:]" + f
  };
  var m = {
    cN: "list",
    b: "\\(",
    e: "\\)"
  };
  var g = {
    eW: true,
    k: {
      literal: "true false nil"
    },
    r: 0
  };
  var i = {
    k: e,
    l: f,
    cN: "title",
    b: f,
    starts: g
  };
  m.c = [{
      cN: "comment",
      b: "comment"
    },
    i, g
  ];
  g.c = [m, j, c, b, o, h, n, d];
  n.c = [m, j, c, o, h, n, d];
  return {
    i: /\S/,
    c: [o, m, {
      cN: "prompt",
      b: /^=> /,
      starts: {
        e: /\n\n|\Z/
      }
    }]
  }
});
hljs.registerLanguage("oxygene", function(b) {
  var g = "abstract add and array as asc aspect assembly async begin break block by case class concat const copy constructor continue create default delegate desc distinct div do downto dynamic each else empty end ensure enum equals event except exit extension external false final finalize finalizer finally flags for forward from function future global group has if implementation implements implies in index inherited inline interface into invariants is iterator join locked locking loop matching method mod module namespace nested new nil not notify nullable of old on operator or order out override parallel params partial pinned private procedure property protected public queryable raise read readonly record reintroduce remove repeat require result reverse sealed select self sequence set shl shr skip static step soft take then to true try tuple type union unit unsafe until uses using var virtual raises volatile where while with write xor yield await mapped deprecated stdcall cdecl pascal register safecall overload library platform reference packed strict published autoreleasepool selector strong weak unretained";
  var a = {
    cN: "comment",
    b: "{",
    e: "}",
    r: 0
  };
  var e = {
    cN: "comment",
    b: "\\(\\*",
    e: "\\*\\)",
    r: 10
  };
  var c = {
    cN: "string",
    b: "'",
    e: "'",
    c: [{
      b: "''"
    }]
  };
  var d = {
    cN: "string",
    b: "(#\\d+)+"
  };
  var f = {
    cN: "function",
    bK: "function constructor destructor procedure method",
    e: "[:;]",
    k: "function constructor|10 destructor|10 procedure|10 method|10",
    c: [b.TM, {
        cN: "params",
        b: "\\(",
        e: "\\)",
        k: g,
        c: [c, d]
      },
      a, e
    ]
  };
  return {
    cI: true,
    k: g,
    i: '("|\\$[G-Zg-z]|\\/\\*|</)',
    c: [a, e, b.CLCM, c, d, b.NM, f, {
      cN: "class",
      b: "=\\bclass\\b",
      e: "end;",
      k: g,
      c: [c, d, a, e, b.CLCM, f]
    }]
  }
});
hljs.registerLanguage("asciidoc", function(a) {
  return {
    c: [{
      cN: "comment",
      b: "^/{4,}\\n",
      e: "\\n/{4,}$",
      r: 10
    }, {
      cN: "comment",
      b: "^//",
      e: "$",
      r: 0
    }, {
      cN: "title",
      b: "^\\.\\w.*$"
    }, {
      b: "^[=\\*]{4,}\\n",
      e: "\\n^[=\\*]{4,}$",
      r: 10
    }, {
      cN: "header",
      b: "^(={1,5}) .+?( \\1)?$",
      r: 10
    }, {
      cN: "header",
      b: "^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$",
      r: 10
    }, {
      cN: "attribute",
      b: "^:.+?:",
      e: "\\s",
      eE: true,
      r: 10
    }, {
      cN: "attribute",
      b: "^\\[.+?\\]$",
      r: 0
    }, {
      cN: "blockquote",
      b: "^_{4,}\\n",
      e: "\\n_{4,}$",
      r: 10
    }, {
      cN: "code",
      b: "^[\\-\\.]{4,}\\n",
      e: "\\n[\\-\\.]{4,}$",
      r: 10
    }, {
      b: "^\\+{4,}\\n",
      e: "\\n\\+{4,}$",
      c: [{
        b: "<",
        e: ">",
        sL: "xml",
        r: 0
      }],
      r: 10
    }, {
      cN: "bullet",
      b: "^(\\*+|\\-+|\\.+|[^\\n]+?::)\\s+"
    }, {
      cN: "label",
      b: "^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+",
      r: 10
    }, {
      cN: "strong",
      b: "\\B\\*(?![\\*\\s])",
      e: "(\\n{2}|\\*)",
      c: [{
        b: "\\\\*\\w",
        r: 0
      }]
    }, {
      cN: "emphasis",
      b: "\\B'(?!['\\s])",
      e: "(\\n{2}|')",
      c: [{
        b: "\\\\'\\w",
        r: 0
      }],
      r: 0
    }, {
      cN: "emphasis",
      b: "_(?![_\\s])",
      e: "(\\n{2}|_)",
      r: 0
    }, {
      cN: "smartquote",
      b: "``.+?''",
      r: 10
    }, {
      cN: "smartquote",
      b: "`.+?'",
      r: 10
    }, {
      cN: "code",
      b: "(`.+?`|\\+.+?\\+)",
      r: 0
    }, {
      cN: "code",
      b: "^[ \\t]",
      e: "$",
      r: 0
    }, {
      cN: "horizontal_rule",
      b: "^'{3,}[ \\t]*$",
      r: 10
    }, {
      b: "(link:)?(http|https|ftp|file|irc|image:?):\\S+\\[.*?\\]",
      rB: true,
      c: [{
        b: "(link|image:?):",
        r: 0
      }, {
        cN: "link_url",
        b: "\\w",
        e: "[^\\[]+",
        r: 0
      }, {
        cN: "link_label",
        b: "\\[",
        e: "\\]",
        eB: true,
        eE: true,
        r: 0
      }],
      r: 10
    }]
  }
});
hljs.registerLanguage("erlang-repl", function(a) {
  return {
    k: {
      special_functions: "spawn spawn_link self",
      reserved: "after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse|10 query receive rem try when xor"
    },
    c: [{
        cN: "prompt",
        b: "^[0-9]+> ",
        r: 10
      }, {
        cN: "comment",
        b: "%",
        e: "$"
      }, {
        cN: "number",
        b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
        r: 0
      },
      a.ASM, a.QSM, {
        cN: "constant",
        b: "\\?(::)?([A-Z]\\w*(::)?)+"
      }, {
        cN: "arrow",
        b: "->"
      }, {
        cN: "ok",
        b: "ok"
      }, {
        cN: "exclamation_mark",
        b: "!"
      }, {
        cN: "function_or_atom",
        b: "(\\b[a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*)|(\\b[a-z'][a-zA-Z0-9_']*)",
        r: 0
      }, {
        cN: "variable",
        b: "[A-Z][a-zA-Z0-9_']*",
        r: 0
      }
    ]
  }
});
hljs.registerLanguage("autohotkey", function(b) {
  var d = {
    cN: "escape",
    b: "`[\\s\\S]"
  };
  var c = {
    cN: "comment",
    b: ";",
    e: "$",
    r: 0
  };
  var a = [{
    cN: "built_in",
    b: "A_[a-zA-Z0-9]+"
  }, {
    cN: "built_in",
    bK: "ComSpec Clipboard ClipboardAll ErrorLevel"
  }];
  return {
    cI: true,
    k: {
      keyword: "Break Continue Else Gosub If Loop Return While",
      literal: "A true false NOT AND OR"
    },
    c: a.concat([d, b.inherit(b.QSM, {
      c: [d]
    }), c, {
      cN: "number",
      b: b.NR,
      r: 0
    }, {
      cN: "var_expand",
      b: "%",
      e: "%",
      i: "\\n",
      c: [d]
    }, {
      cN: "label",
      c: [d],
      v: [{
        b: '^[^\\n";]+::(?!=)'
      }, {
        b: '^[^\\n";]+:(?!=)',
        r: 0
      }]
    }, {
      b: ",\\s*,",
      r: 10
    }])
  }
});
hljs.registerLanguage("scilab", function(a) {
  var b = [a.CNM, {
    cN: "string",
    b: "'|\"",
    e: "'|\"",
    c: [a.BE, {
      b: "''"
    }]
  }];
  return {
    k: {
      keyword: "abort break case clear catch continue do elseif else endfunction end for functionglobal if pause return resume select try then while%f %F %t %T %pi %eps %inf %nan %e %i %z %s",
      built_in: "abs and acos asin atan ceil cd chdir clearglobal cosh cos cumprod deff disp errorexec execstr exists exp eye gettext floor fprintf fread fsolve imag isdef isemptyisinfisnan isvector lasterror length load linspace list listfiles log10 log2 logmax min msprintf mclose mopen ones or pathconvert poly printf prod pwd rand realround sinh sin size gsort sprintf sqrt strcat strcmps tring sum system tanh tantype typename warning zeros matrix"
    },
    i: '("|#|/\\*|\\s+/\\w+)',
    c: [{
      cN: "function",
      bK: "function endfunction",
      e: "$",
      k: "function endfunction|10",
      c: [a.UTM, {
        cN: "params",
        b: "\\(",
        e: "\\)"
      }, ],
    }, {
      cN: "transposed_variable",
      b: "[a-zA-Z_][a-zA-Z_0-9]*('+[\\.']*|[\\.']+)",
      e: "",
      r: 0
    }, {
      cN: "matrix",
      b: "\\[",
      e: "\\]'*[\\.']*",
      r: 0,
      c: b
    }, {
      cN: "comment",
      b: "//",
      e: "$"
    }].concat(b)
  }
});