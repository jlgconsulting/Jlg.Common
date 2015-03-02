﻿using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Extensions;

namespace ExtensonsTests
{
    [TestClass]
    public class StringExtensionsTests
    {
        [TestMethod]
        public void Capitalize()
        {
            Assert.AreEqual("Dan",
                            "dan".Capitalize(), false);

            Assert.AreEqual("Dan Misailescu",
                            " dan misailescu   ".Capitalize(), false);

            Assert.AreEqual("This Is A Very Long Text",
                            " thIs    is a   vERy  LONG texT  ".Capitalize(), false);

            Assert.AreEqual("Dan.Misailescu",
                           "   dan.misailescu ".Capitalize(), false);

            Assert.AreEqual("A/Ba Ap\\Ca A.Ddd A;E A,F",
                            " a/bA   ap\\ca  a.ddd a;e     a,f  ".Capitalize(), false);
        }

        [TestMethod]
        public void LowerCaseAndIgnoreSpaces()
        {
            Assert.AreEqual("thisisaverylongtext",
                            " thIs    is a   vERy  LONG texT  ".LowerCaseAndIgnoreSpaces(), false);
        }


    }
}
