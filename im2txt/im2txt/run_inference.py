# Copyright 2016 The TensorFlow Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ==============================================================================
r"""Generate captions for images using default beam search parameters."""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import math
import os

import tensorflow as tf
import json
import configuration
import inference_wrapper
from inference_utils import caption_generator
from inference_utils import vocabulary

FLAGS = tf.flags.FLAGS

tf.flags.DEFINE_string("checkpoint_path", "",
                       "Model checkpoint file or directory containing a "
                       "model checkpoint file.")
tf.flags.DEFINE_string("vocab_file", "", "Text file containing the vocabulary.")
tf.flags.DEFINE_string("input_files", "",
                       "File pattern or comma-separated list of file patterns "
                       "of image files.")

tf.logging.set_verbosity(tf.logging.INFO)


def main(_):
    # Build the inference graph.
    g = tf.Graph()
    model_path = '/Users/harshpyati/personal/fyp/text_gen/model.ckpt-2000000'
    vocab_path = '/Users/harshpyati/personal/fyp/text_gen/word_counts.txt'
    with g.as_default():
        model = inference_wrapper.InferenceWrapper()
        restore_fn = model.build_graph_from_config(configuration.ModelConfig(),
                                                   model_path)
    g.finalize()

    # Create the vocabulary.
    vocab = vocabulary.Vocabulary(vocab_path)
    all_files = FLAGS.input_files.split(',')
    files = []
    for fil in all_files:
        word = None
        if '[' in fil:
            word = fil.replace('[', '')
        if ']' in fil:
            word = fil.replace(']', '')
        if ' ' in fil:
            word = fil.replace(' ', '')
        if "u'" in fil:
            word = fil.replace("u'", '')
        if '\'' in fil:
            word = fil.replace("'", '')
        if "'" in fil:
            word = fil.replace("'", '')
        if "[u" in fil:
            word = fil.replace("[u", '')
        if " u" in fil:
            word = fil.replace(" u", '')
        word = word.split('\'')[1]
        files.append(word)
    filenames = []
    with tf.Session(graph=g) as sess:
        generator = caption_generator.CaptionGenerator(model, vocab)
        # Load the model from checkpoint.
        restore_fn(sess)
        all_captions = []

        for file_pattern in files:
            filenames.extend(tf.gfile.Glob(file_pattern))
            tf.logging.info("Running caption generation on %d files matching %s",
                            len(filenames), file_pattern)

            with tf.gfile.GFile(file_pattern, "rb") as f:
                image = f.read()
            captions = generator.beam_search(sess, image)
            for index, caption in enumerate(captions):
                sentence = [vocab.id_to_word(w) for w in caption.sentence[1:-1]]
                sentence = " ".join(sentence)
                data = {
                    "name": file_pattern,
                    "caption": sentence
                }
                all_captions.append(data)
                break
    print(all_captions)


if __name__ == "__main__":
    tf.app.run()
